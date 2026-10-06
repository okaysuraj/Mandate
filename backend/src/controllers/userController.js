import { handler, HttpError, pick } from '../utils/http.js';
import Project from '../models/Project.js';
import { workspaceAccess } from '../utils/access.js';
export const addProject = handler(async(req,res)=>{
 const workspace=await workspaceAccess(req.user,req.body.workspaceId,true);
 if(typeof req.body.project!=='string')throw new HttpError(400,'Project name must be text');
 const project=await Project.create({name:req.body.project,workspaceId:workspace._id});
 res.status(201).json(project);
});
export const updateProfile = handler(async(req,res)=>{
 const user=req.user; Object.assign(user,pick(req.body,['name','avatar','timezone']));
 if(req.body.preferences!==undefined){
  const prefs=req.body.preferences;
  if(!prefs||typeof prefs!=='object'||Array.isArray(prefs))throw new HttpError(400,'Invalid preferences');
  Object.assign(user.preferences,pick(prefs,['theme','notifications']));
  if(prefs.workHours!==undefined){if(!prefs.workHours||typeof prefs.workHours!=='object')throw new HttpError(400,'Invalid work hours');Object.assign(user.preferences.workHours,pick(prefs.workHours,['start','end']));}
 }
 await user.save();res.json({_id:user.id,name:user.name,email:user.email,avatar:user.avatar,timezone:user.timezone,preferences:user.preferences,activeWorkspace:user.activeWorkspace});
});
export const registerPushToken=handler(async(req,res)=>{
 const token=req.body.expoPushToken;
 if(typeof token!=='string'||! /^(ExponentPushToken|ExpoPushToken)\[[A-Za-z0-9_-]{10,200}\]$/.test(token))throw new HttpError(400,'Invalid Expo push token');
 req.user.expoPushToken=token;await req.user.save();res.json({message:'Push token registered'});
});
