import mongoose from 'mongoose';
import FocusSession from '../models/FocusSession.js';
import Review from '../models/Review.js';
import Task from '../models/Task.js';
import Activity from '../models/Activity.js';
import Comment from '../models/Comment.js';
import Goal from '../models/Goal.js';
import DailyMandate from '../models/DailyMandate.js';
import { handler, HttpError, pagination } from '../utils/http.js';
import { workspaceAccess, resourceAccess, idString, assertId } from '../utils/access.js';
import { validateTaskData } from '../utils/taskData.js';
import { runAutomations } from './automationsController.js';

const log = async (req,task,action,session) => (await Activity.create([{workspaceId:task.workspaceId,entityType:'task',entityId:task._id,userId:req.user._id,action}],{session}))[0];
const emit = (req, task, event, payload = task) => req.io?.to(idString(task.workspaceId)).emit(event, payload);
const complete = (data, task) => {
  if (data.status !== undefined) data.completedAt = data.status === 'completed' ? (task?.completedAt || new Date()) : null;
};
export const getTasks = handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.query.workspaceId);
  const query = { workspaceId: workspace._id };
  for (const field of ['status', 'priority', 'projectId', 'assigneeId']) if (req.query[field]) query[field] = req.query[field];
  if (req.query.parentTaskId !== undefined) query.parentTaskId = ['null', 'none'].includes(req.query.parentTaskId) ? null : assertId(req.query.parentTaskId);
  const { page, limit, skip } = pagination(req.query);
  if (req.query.view && !['summary','options'].includes(req.query.view)) throw new HttpError(400, 'Unsupported task view');
  const records = Task.find(query).sort({ orderIndex: 1, createdAt: -1, _id: -1 }).skip(skip).limit(limit);
  if (req.query.view === 'summary') records.select('-attachments -subtasks');
  if (req.query.view === 'options') records.select('title workspaceId');
  const [total, data] = await Promise.all([Task.countDocuments(query), records.lean()]);
  res.json({ data, pagination: { total, page, pages: Math.ceil(total / limit), limit } });
});
export const getTaskById = handler(async (req, res) => {
  const { resource } = await resourceAccess(Task, req.user, req.params.id);
  res.json(await resource.populate([{ path: 'creatorId', select: 'name email avatar' }, { path: 'assigneeId', select: 'name email avatar' }]));
});
export const createTask = handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.body.workspaceId, true);
  const data = await validateTaskData(req.body, workspace);
  complete(data);
  const task = await Task.create({ ...data, creatorId: req.user._id, workspaceId: workspace._id });
  await log(req, task, 'created');
  await runAutomations('task_created', task, req.io);
  emit(req, task, 'task:created');
  res.status(201).json(task);
});
export const updateTask = handler(async (req, res) => {
  const { resource: task, workspace } = await resourceAccess(Task, req.user, req.params.id, true);
  if (req.body.workspaceId && idString(req.body.workspaceId) !== idString(workspace._id)) throw new HttpError(400, 'Moving tasks between workspaces is not supported');
  const data = await validateTaskData(req.body, workspace, task);
  const previousStatus = task.status, previousPriority = task.priority;
  complete(data, task);
  Object.assign(task, data);
  await task.save();
  await log(req, task, data.status === 'completed' && previousStatus !== 'completed' ? 'completed' : 'updated');
  if (task.status !== previousStatus) await runAutomations('status_changed', task, req.io);
  if (task.priority !== previousPriority) await runAutomations('priority_changed', task, req.io);
  emit(req, task, 'task:updated');
  res.json(task);
});
const removeTask = async (req, task, session) => {
  await FocusSession.updateMany({taskId:task._id},{$set:{taskId:null}},{session});
  await Review.updateMany({taskId:task._id},{$set:{taskId:null}},{session});
  await Comment.deleteMany({ taskId: task._id }, {session});
  await Task.updateMany({ workspaceId: task.workspaceId, parentTaskId: task._id }, { $set: { parentTaskId: null } }, { runValidators: true, session });
  await Goal.updateMany({ workspaceId: task.workspaceId }, { $pull: { linkedTasks: task._id } },{session});
  await DailyMandate.updateMany({ tasks: task._id }, { $pull: { tasks: task._id } },{session});
  await task.deleteOne({session});
  await log(req, task, 'deleted',session);
};
export const deleteTask = handler(async (req, res) => {
  const { resource } = await resourceAccess(Task, req.user, req.params.id, true);
  await mongoose.connection.transaction(session=>removeTask(req,resource,session));
  emit(req,resource,'task:deleted',resource._id);
  res.json({ id: req.params.id, message: 'Task deleted' });
});
export const duplicateTask = handler(async (req, res) => {
  const { resource } = await resourceAccess(Task, req.user, req.params.id, true);
  const data = resource.toObject();
  for (const key of ['_id', '__v', 'createdAt', 'updatedAt', 'recurrenceSourceId']) delete data[key];
  Object.assign(data, { title: (data.title.slice(0,193) + ' (Copy)'), status: 'pending', completedAt: null, timeSpent: 0, creatorId: req.user._id });
  data.subtasks = data.subtasks.map(s => ({ title: s.title, isCompleted: false }));
  const task = await Task.create(data);
  await log(req, task, 'duplicated');
  emit(req, task, 'task:created');
  res.status(201).json(task);
});
export const bulkAction = handler(async (req, res) => {
  const { taskIds, action, updates = {} } = req.body;
  if (!Array.isArray(taskIds) || !taskIds.length || taskIds.length > 100 || !['edit','delete'].includes(action)) throw new HttpError(400, 'Invalid bulk action');
  const authorized = [];
  for (const id of [...new Set(taskIds)]) {
    const { resource: task, workspace } = await resourceAccess(Task, req.user, id, true);
    const data = action === 'edit' ? await validateTaskData(updates, workspace, task) : {};
    complete(data, task);
    if (action === 'edit') { task.set(data); await task.validate(); }
    authorized.push(task);
  }
  // Validate every record and permission before making any changes.
  await mongoose.connection.transaction(async session=>{
   for (const task of authorized) {
    if(action==='delete')await removeTask(req,task,session);
    else{await task.save({session});await log(req,task,'updated',session);}
   }
  });
  for(const task of authorized)emit(req,task,action==='delete'?'task:deleted':'task:updated',action==='delete'?task._id:task);
  res.json({ message: 'Bulk action completed', count: authorized.length });
});
export const reorderTasks = handler(async (req, res) => {
  if (!Array.isArray(req.body.tasks) || req.body.tasks.length > 200) throw new HttpError(400, 'Invalid tasks array');
  const records = [];
  for (const item of req.body.tasks) {
    if (!item || typeof item !== 'object' || !Number.isSafeInteger(item.orderIndex) || item.orderIndex < 0) throw new HttpError(400, 'Invalid orderIndex');
    const { resource } = await resourceAccess(Task, req.user, item._id, true);
    records.push({ resource, orderIndex: item.orderIndex });
  }
  await mongoose.connection.transaction(async session=>{for(const {resource,orderIndex}of records){resource.orderIndex=orderIndex;await resource.save({session});}});
  for(const {resource}of records)emit(req,resource,'task:updated');
  res.json({ message: 'Tasks reordered' });
});
export const getAnalytics = handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.query.workspaceId);
  const completed = {$eq:['$status','completed']};
  const active = {$not:[{$in:['$status',['completed','archived']]}]};
  const [summary] = await Task.aggregate([
    {$match:{workspaceId:workspace._id}},
    {$group:{_id:null,totalTasks:{$sum:1},completedTasks:{$sum:{$cond:[completed,1,0]}},
      activeTasks:{$sum:{$cond:[active,1,0]}},highPriorityTasks:{$sum:{$cond:[{$in:['$priority',['high','urgent']]},1,0]}},
      latency:{$avg:{$cond:[{$and:[completed,{$ne:['$completedAt',null]},{$ne:['$createdAt',null]}]},{$max:[0,{$subtract:['$completedAt','$createdAt']}]},null]}},
      totalTimeSpent:{$sum:'$timeSpent'},estimatedMinutes:{$sum:'$timeEstimate'},
      overdueTasks:{$sum:{$cond:[{$and:[active,{$ne:['$dueDate',null]},{$lt:['$dueDate',new Date()]}]},1,0]}},
    }},
  ]);
  const {totalTasks=0,completedTasks=0,activeTasks=0,highPriorityTasks=0,latency=0,totalTimeSpent=0,estimatedMinutes=0,overdueTasks=0} = summary || {};
  res.json({totalTasks,completedTasks,activeTasks,highPriorityTaskPercentage:totalTasks?Math.round(highPriorityTasks/totalTasks*100):0,
    averageResolutionLatency:Math.floor((latency||0)/3600000)+'h '+Math.floor((latency||0)%3600000/60000)+'m',totalTimeSpent,estimatedMinutes,overdueTasks});
});
