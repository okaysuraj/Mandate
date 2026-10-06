import { HttpError } from '../utils/http.js';
import { assertId } from '../utils/access.js';
const statuses={todo:'pending',backlog:'pending',doing:'in-progress',in_progress:'in-progress',review:'validation',testing:'validation',done:'completed',finished:'completed'};
const priorities={alpha:'urgent',critical:'urgent',beta:'high',gamma:'medium',normal:'medium'};
export const sanitizeAndValidateTask=(req,res,next)=>{
 try{
  const body=req.body;
  if(req.method==='POST' && !body.title) throw new HttpError(400,'Task title is required');
  if(body.title!==undefined){if(typeof body.title!=='string'||!body.title.trim()||body.title.trim().length>200)throw new HttpError(400,'Task title must contain 1 to 200 characters');body.title=body.title.trim();}
  for(const [field,aliases,allowed] of [['status',statuses,['pending','in-progress','validation','completed','archived']],['priority',priorities,['low','medium','high','urgent']]]){
    if(body[field]!==undefined){if(typeof body[field]!=='string')throw new HttpError(400,'Invalid '+field);body[field]=aliases[body[field].toLowerCase()]||body[field].toLowerCase();if(!allowed.includes(body[field]))throw new HttpError(400,'Invalid '+field);}
  }
  for(const field of ['dueDate','startDate','snoozedUntil'])if(body[field]!==undefined){if(body[field]===''||body[field]===null)body[field]=null;else if(typeof body[field]!=='string'||!Number.isFinite(Date.parse(body[field])))throw new HttpError(400,'Invalid '+field);}
  for(const field of ['projectId','parentTaskId','assigneeId'])if(body[field]!==undefined){if(['','none','null','Inbox'].includes(body[field])||body[field]===null)body[field]=null;else assertId(body[field],field);}
  if(body.workspaceId!==undefined)assertId(body.workspaceId,'workspaceId');
  for(const field of ['timeSpent','timeEstimate','orderIndex'])if(body[field]!==undefined && (typeof body[field]!=='number'||!Number.isFinite(body[field])||body[field]<0))throw new HttpError(400,'Invalid '+field);
  if(body.subtasks!==undefined){if(!Array.isArray(body.subtasks)||body.subtasks.some(s=>typeof s!=='object'||!s||typeof s.title!=='string'||!s.title.trim()||(s.isCompleted!==undefined&&typeof s.isCompleted!=='boolean')))throw new HttpError(400,'Invalid subtasks');}
  next();
 }catch(error){next(error);}
};
