import Task from '../models/Task.js';
import Project from '../models/Project.js';
import Goal from '../models/Goal.js';
import Document from '../models/Document.js';
import { workspaceIdsFor } from '../utils/access.js';
import { handler, HttpError } from '../utils/http.js';
export const searchGlobal=handler(async(req,res)=>{
  const q=(req.query.q||'').trim();
  if(q.length>100) throw new HttpError(400,'Search query exceeds 100 characters');
  if(!q) return res.json({tasks:[],projects:[],goals:[],documents:[],pages:[]});
  const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
  const workspaceId={$in:await workspaceIdsFor(req.user)};
  const [tasks,projects,goals,documents]=await Promise.all([
    Task.find({workspaceId,$or:[{title:regex},{description:regex},{tags:regex}]}).limit(20).select('title status priority workspaceId'),
    Project.find({workspaceId,$or:[{name:regex},{description:regex}]}).limit(20).select('name status workspaceId'),
    Goal.find({workspaceId,$or:[{title:regex},{description:regex}]}).limit(20).select('title status workspaceId'),
    Document.find({workspaceId,$or:[{title:regex},{content:regex}]}).limit(20).select('title workspaceId')
  ]);
  res.json({tasks,projects,goals,documents,pages:[]});
});
