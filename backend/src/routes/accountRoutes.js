import express from 'express';
import { getAuth } from 'firebase-admin/auth';
import { protect } from '../middleware/authMiddleware.js';
import ApiSession from '../models/ApiSession.js';
import User from '../models/User.js';
import Task from '../models/Task.js';
import Project from '../models/Project.js';
import Goal from '../models/Goal.js';
import Document from '../models/Document.js';
import Event from '../models/Event.js';
import WorkspaceRecord from '../models/WorkspaceRecord.js';
import SavedView from '../models/SavedView.js';
import Review from '../models/Review.js';
import FocusSession from '../models/FocusSession.js';
import { handler, HttpError } from '../utils/http.js';
import { assertId, workspaceAccess } from '../utils/access.js';
import { sessionKeyFor } from '../utils/apiSession.js';
const router=express.Router();
router.use(protect);
router.get('/sessions',handler(async(req,res)=>{
  const sessions=await ApiSession.find({userId:req.user._id}).sort({lastSeenAt:-1}).limit(100).select('-sessionKey');
  const current=await ApiSession.findOne({sessionKey:sessionKeyFor(req.firebaseUser)});
  res.json(sessions.map(s=>({...s.toObject(),current:String(s._id)===String(current?._id)})));
}));
router.delete('/sessions/:id',handler(async(req,res)=>{
  const session=await ApiSession.findOneAndUpdate({_id:assertId(req.params.id),userId:req.user._id},{$set:{revokedAt:new Date()}},{new:true});
  if(!session)throw new HttpError(404,'Session not found');
  req.io?.in('user:'+req.user._id).disconnectSockets(true);
  res.json({message:'Session revoked'});
}));
router.post('/revoke-sessions',handler(async(req,res)=>{
  if(Date.now()-req.firebaseUser.auth_time*1000>300000)throw new HttpError(401,'Sign in again before revoking all sessions');
  await User.updateOne({_id:req.user._id},{$set:{sessionsRevokedBefore:new Date()}});
  await ApiSession.updateMany({userId:req.user._id,revokedAt:null},{$set:{revokedAt:new Date()}});
  await getAuth().revokeRefreshTokens(req.user.firebaseUid);
  req.io?.in('user:'+req.user._id).disconnectSockets(true);
  res.json({message:'All sessions revoked; sign in again'});
}));
router.get('/export',handler(async(req,res)=>{
  const workspace=await workspaceAccess(req.user,req.query.workspaceId);
  const workspaceId=workspace._id;
  const models={tasks:Task,projects:Project,goals:Goal,documents:Document,events:Event,records:WorkspaceRecord,savedViews:SavedView,reviews:Review,focusSessions:FocusSession};
  const data={exportedAt:new Date().toISOString(),workspace:{_id:workspace._id,name:workspace.name}};
  for(const [name,Model] of Object.entries(models)){
    const filter={workspaceId};if(['reviews','focusSessions'].includes(name))filter.userId=req.user._id;if(name==='savedViews')filter.creatorId=req.user._id;
    const count=await Model.countDocuments(filter);if(count>10000)throw new HttpError(413,'Workspace export exceeds synchronous limit; contact support for a bulk export');
    data[name]=await Model.find(filter).lean();
  }
  res.json(data);
}));
export default router;
