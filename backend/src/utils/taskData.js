import FileAsset from '../models/FileAsset.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import { validateReferences, validateMembers, idString, assertId } from './access.js';
import { HttpError, pick } from './http.js';
export const taskFields = ['title', 'description', 'intent', 'status', 'priority', 'dueDate', 'startDate', 'projectId', 'parentTaskId', 'assigneeId', 'tags', 'timeSpent', 'timeEstimate', 'energyLevel', 'recurrenceRule', 'subtasks', 'attachments', 'orderIndex', 'snoozedUntil'];
export const validateTaskData = async (body, workspace, task) => {
  const data = pick(body, taskFields);
  await validateReferences(data, workspace, Project, 'projectId');
  await validateReferences(data, workspace, Task, 'parentTaskId');
  validateMembers(data, workspace, 'assigneeId');
  if(data.tags!==undefined&&(!Array.isArray(data.tags)||data.tags.some(tag=>typeof tag!=='string'||!tag.trim())))throw new HttpError(400,'Tags must be non-empty text');
  if(data.subtasks!==undefined&&(!Array.isArray(data.subtasks)||data.subtasks.some(item=>!item||typeof item!=='object'||typeof item.title!=='string'||!item.title.trim()||(item.isCompleted!==undefined&&typeof item.isCompleted!=='boolean'))))throw new HttpError(400,'Invalid subtask fields');
  if(data.attachments!==undefined){
    if(!Array.isArray(data.attachments))throw new HttpError(400,'Invalid attachments');
    for(const attachment of data.attachments){
      if(!attachment||typeof attachment!=='object')throw new HttpError(400,'Invalid attachment');
      if(!attachment.assetId)throw new HttpError(400,'Attachment must be uploaded through this workspace');
      const asset=await FileAsset.findOne({_id:assertId(attachment.assetId),workspaceId:workspace._id});
      if(!asset)throw new HttpError(400,'Attachment does not belong to this workspace');
      Object.assign(attachment,{name:asset.name,type:asset.mimeType,size:asset.size,url:asset.deliveryUrl});
    }
  }
  let parent = data.parentTaskId;
  const visited = new Set();
  while (parent) {
    if (idString(parent) === idString(task?._id) || visited.has(idString(parent))) throw new HttpError(400, 'Task hierarchy cannot contain a cycle');
    visited.add(idString(parent));
    parent = (await Task.findOne({ _id: parent, workspaceId: workspace._id }))?.parentTaskId;
  }
  const start = data.startDate === undefined ? task?.startDate : data.startDate;
  const end = data.dueDate === undefined ? task?.dueDate : data.dueDate;
  if (start && end && new Date(start) > new Date(end)) throw new HttpError(400, 'startDate must not be after dueDate');
  return data;
};
