import mongoose from 'mongoose';
import Workspace from '../models/Workspace.js';
import User from '../models/User.js';
import { workspaceAccess, idString, assertId, roleFor } from '../utils/access.js';
import { handler, pick, HttpError, pagination } from '../utils/http.js';
export const createWorkspace = handler(async (req, res) => {
  let workspace;
  await mongoose.connection.transaction(async session => {
    [workspace] = await Workspace.create([{ name: req.body.name, type: req.body.type || 'team', owner: req.user._id, members: [{ user: req.user._id, role: 'Admin' }] }], { session });
    await User.updateOne({ _id: req.user._id }, { $addToSet: { workspaces: workspace._id } }, { session, runValidators: true });
  });
  res.status(201).json(workspace);
});
export const getWorkspaces = handler(async (req, res) => {
  const {limit,skip}=pagination(req.query);
  res.json(await Workspace.find({ $or: [{ owner: req.user._id }, { 'members.user': req.user._id }] }).sort({createdAt:1}).skip(skip).limit(limit));
});
export const getWorkspace = handler(async (req,res)=>res.json(await workspaceAccess(req.user, req.params.id)));
export const updateWorkspace = handler(async (req,res)=>{
  const workspace=await workspaceAccess(req.user,req.params.id,true,true);
  Object.assign(workspace,pick(req.body,['name','type'])); await workspace.save(); res.json(workspace);
});
export const switchActiveWorkspace = handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.params.id);
  await User.updateOne({ _id: req.user._id }, { $set: { activeWorkspace: workspace._id }, $addToSet: { workspaces: workspace._id } }, { runValidators: true });
  res.json({ activeWorkspace: workspace._id });
});
export const getWorkspaceMembers = handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.params.id);
  await workspace.populate('members.user', 'name email avatar');
  res.json(workspace.members.filter(m=>m.user));
});
export const updateMemberRole = handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.params.id, true, true);
  assertId(req.params.userId, 'userId');
  if (!['Admin','Editor','Viewer'].includes(req.body.role)) throw new HttpError(400,'Invalid role');
  if (idString(workspace.owner) === req.params.userId) throw new HttpError(400,'Workspace owner must remain an Admin');
  const member = workspace.members.find(m=>idString(m.user)===req.params.userId);
  if (!member) throw new HttpError(404,'Member not found');
  member.role=req.body.role; await workspace.save();
  // Drop existing subscriptions when a member's permissions change.
  req.io?.in('user:'+req.params.userId).socketsLeave(idString(workspace._id));
  res.json(workspace.members);
});
export const toggleIntegration = handler(async (req,res)=>{
  await workspaceAccess(req.user,req.params.id,true,true);
  throw new HttpError(503,'Integration requires a configured provider connection');
});
export const addWorkspaceMember = handler(async (req,res)=>{
  const workspace=await workspaceAccess(req.user,req.params.id,true,true);
  const { email, role='Viewer' }=req.body;
  if (typeof email!=='string' || !['Admin','Editor','Viewer'].includes(role)) throw new HttpError(400,'Valid email and role required');
  const target=await User.findOne({email:email.trim().toLowerCase()});
  if(!target) throw new HttpError(404,'Registered user not found');
  await mongoose.connection.transaction(async session=>{
   const current=await Workspace.findOne({_id:workspace._id,'members.user':{$ne:target._id}}).session(session);
   if(!current)throw new HttpError(409,'User is already a member');
   current.members.push({user:target._id,role});await current.save({session});
   const user=await User.findById(target._id).session(session);user.workspaces.addToSet(workspace._id);await user.save({session});
  });
  const updated=await Workspace.findById(workspace._id).populate('members.user','name email avatar');
  res.status(201).json(updated.members);
});
export const transferOwnership = handler(async(req,res)=>{
  const workspace=await workspaceAccess(req.user,req.params.id,true,true);
  if(roleFor(workspace,req.user._id)!=='Owner') throw new HttpError(403,'Only the owner can transfer ownership');
  const member=workspace.members.find(m=>idString(m.user)===assertId(req.body.userId,'userId'));
  if(!member) throw new HttpError(400,'New owner must be a member');
  workspace.owner=member.user;member.role='Admin';await workspace.save();res.json(workspace);
});
