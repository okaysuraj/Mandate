import express from 'express';
import mongoose from 'mongoose';
import { protect } from '../middleware/authMiddleware.js';
import SavedView from '../models/SavedView.js';
import FocusSession from '../models/FocusSession.js';
import Review from '../models/Review.js';
import Task from '../models/Task.js';
import { workspaceAccess, resourceAccess, validateReferences, idString } from '../utils/access.js';
import { handler, HttpError, pagination, pick } from '../utils/http.js';
const router = express.Router();
router.use(protect);
router.get('/saved-views', handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.query.workspaceId);
  const {limit,skip}=pagination(req.query);
  res.json(await SavedView.find({ workspaceId: workspace._id, creatorId: req.user._id }).sort({createdAt:-1}).skip(skip).limit(limit));
}));
const validView = body => {
  const allowedFilters=['status','priority','projectId','assigneeId','tags'];
  const allowedSort=['dueDate','createdAt','orderIndex','priority'];
  for (const key of Object.keys(body.filters || {})) if (!allowedFilters.includes(key) || typeof body.filters[key] !== 'string') throw new HttpError(400,'Invalid saved filter');
  for (const key of Object.keys(body.sort || {})) if (!allowedSort.includes(key) || ![1,-1].includes(body.sort[key])) throw new HttpError(400,'Invalid saved sort');
};
router.post('/saved-views', handler(async(req,res)=>{
  const workspace=await workspaceAccess(req.user,req.body.workspaceId,true);
  const data=pick(req.body,['name','filters','sort','viewType']);validView(data);
  res.status(201).json(await SavedView.create({...data,workspaceId:workspace._id,creatorId:req.user._id}));
}));
router.put('/saved-views/:id',handler(async(req,res)=>{
  const {resource}=await resourceAccess(SavedView,req.user,req.params.id,true);
  if(idString(resource.creatorId)!==idString(req.user._id))throw new HttpError(403,'Saved view belongs to another user');
  const data=pick(req.body,['name','filters','sort','viewType']);validView(data);Object.assign(resource,data);await resource.save();res.json(resource);
}));
router.delete('/saved-views/:id',handler(async(req,res)=>{
  const {resource}=await resourceAccess(SavedView,req.user,req.params.id,true);
  if(idString(resource.creatorId)!==idString(req.user._id))throw new HttpError(403,'Saved view belongs to another user');
  await resource.deleteOne();res.json({id:req.params.id});
}));
router.get('/saved-views/:id/tasks',handler(async(req,res)=>{
 const {resource:view}=await resourceAccess(SavedView,req.user,req.params.id);
 if(idString(view.creatorId)!==idString(req.user._id))throw new HttpError(403,'Saved view belongs to another user');
 const {limit,skip}=pagination(req.query);validView(view);
 res.json(await Task.find({workspaceId:view.workspaceId,...view.filters}).sort(Object.keys(view.sort).length?view.sort:{orderIndex:1,createdAt:-1,_id:-1}).skip(skip).limit(limit));
}));
router.get('/focus',handler(async(req,res)=>{
  const workspace=await workspaceAccess(req.user,req.query.workspaceId);
  const {limit,skip}=pagination(req.query);
  if (req.query.active !== undefined && !['true','false'].includes(req.query.active)) throw new HttpError(400,'Invalid active filter');
  const query = {workspaceId:workspace._id,userId:req.user._id,...(req.query.active==='true'?{endedAt:null}:{})};
  res.json(await FocusSession.find(query).populate('taskId','title').sort({startedAt:-1,_id:-1}).skip(skip).limit(limit).lean());
}));
router.post('/focus',handler(async(req,res)=>{
  const {resource:task}=await resourceAccess(Task,req.user,req.body.taskId,true);
  res.status(201).json(await FocusSession.create({workspaceId:task.workspaceId,userId:req.user._id,taskId:task._id,startedAt:new Date()}));
}));
router.put('/focus/:id',handler(async(req,res)=>{
  const {resource:session}=await resourceAccess(FocusSession,req.user,req.params.id,true);
  if(idString(session.userId)!==idString(req.user._id))throw new HttpError(403,'Focus session belongs to another user');
  if(session.endedAt)throw new HttpError(409,'Focus session has already ended');
  const duration=Math.min(1440,Math.max(0,(Date.now()-session.startedAt.getTime())/60000));
  if(req.body.notes!==undefined&&typeof req.body.notes!=='string')throw new HttpError(400,'Focus notes must be text');
  session.endedAt=new Date();session.durationMinutes=duration;session.notes=req.body.notes||'';
  await mongoose.connection.transaction(async transaction=>{
    const ended=await FocusSession.findOneAndUpdate({_id:session._id,endedAt:null},{$set:{endedAt:session.endedAt,durationMinutes:duration,notes:session.notes}},{session:transaction,new:true,runValidators:true});
    if(!ended)throw new HttpError(409,'Focus session has already ended');
    const task=await Task.findOne({_id:session.taskId,workspaceId:session.workspaceId}).session(transaction);
    if(task){task.timeSpent+=duration;await task.save({session:transaction});}
  });
  res.json(session);
}));
router.get('/reviews',handler(async(req,res)=>{
  const workspace=await workspaceAccess(req.user,req.query.workspaceId);
  const {limit,skip}=pagination(req.query);
  const filter={workspaceId:workspace._id,userId:req.user._id};if(req.query.period)filter.period=req.query.period;
  res.json(await Review.find(filter).sort({date:-1,createdAt:-1}).skip(skip).limit(limit));
}));
router.post('/reviews',handler(async(req,res)=>{
  const workspace=await workspaceAccess(req.user,req.body.workspaceId,true);
  const data=pick(req.body,['title','notes','rating','period','date','taskId']);
  await validateReferences(data,workspace,Task,'taskId');
  if(!data.date||!Number.isFinite(Date.parse(data.date))||new Date(data.date).toISOString().slice(0,10)!==data.date)throw new HttpError(400,'Invalid review date');
  res.status(201).json(await Review.create({...data,workspaceId:workspace._id,userId:req.user._id}));
}));
router.put('/reviews/:id',handler(async(req,res)=>{
  const {resource}=await resourceAccess(Review,req.user,req.params.id,true);
  if(idString(resource.userId)!==idString(req.user._id))throw new HttpError(403,'Review belongs to another user');
  Object.assign(resource,pick(req.body,['title','notes','rating']));await resource.save();res.json(resource);
}));
router.delete('/reviews/:id',handler(async(req,res)=>{
  const {resource}=await resourceAccess(Review,req.user,req.params.id,true);
  if(idString(resource.userId)!==idString(req.user._id))throw new HttpError(403,'Review belongs to another user');
  await resource.deleteOne();res.json({id:req.params.id});
}));
export default router;
