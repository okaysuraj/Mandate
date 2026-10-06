import express from 'express';
import { readFileSync } from 'node:fs';
import { protect } from '../middleware/authMiddleware.js';
import WorkspaceRecord from '../models/WorkspaceRecord.js';
import Project from '../models/Project.js';
import Task from '../models/Task.js';
import mongoose from 'mongoose';
import { handler, HttpError, pick, pagination } from '../utils/http.js';
import { workspaceAccess, resourceAccess, validateMembers, validateReferences } from '../utils/access.js';
const catalog = JSON.parse(readFileSync(new URL('../../../shared/featureCatalog.json', import.meta.url)));
const kinds = new Set(catalog.filter(feature => feature.mode === 'records').map(feature => feature.key));
const fields = ['title', 'description', 'status', 'ownerId', 'projectId', 'targetDate', 'amount', 'currency', 'severity'];
const router = express.Router();
router.use(protect);
router.use('/:kind', (req, res, next) => kinds.has(req.params.kind) ? next() : next(new HttpError(404, 'Feature not found')));
const validate = async (body, workspace) => {
  validateMembers(body, workspace, 'ownerId');
  await validateReferences(body, workspace, Project, 'projectId');
  if (body.amount !== undefined && body.amount !== null && (typeof body.amount !== 'number' || !Number.isFinite(body.amount))) throw new HttpError(400, 'Invalid amount');
};
router.get('/:kind', handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.query.workspaceId);
  const filter = { workspaceId: workspace._id, kind: req.params.kind };
  const { page, limit, skip } = pagination(req.query);
  const [data, total] = await Promise.all([WorkspaceRecord.find(filter).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit), WorkspaceRecord.countDocuments(filter)]);
  res.json({ data, pagination: { total, page, pages: Math.ceil(total / limit) } });
}));
router.post('/:kind', handler(async (req, res) => {
  const workspace = await workspaceAccess(req.user, req.body.workspaceId, true);
  const data = pick(req.body, fields);
  await validate(data, workspace);
  res.status(201).json(await WorkspaceRecord.create({ ...data, kind: req.params.kind, workspaceId: workspace._id, creatorId: req.user._id }));
}));
router.put('/:kind/:id', handler(async (req, res) => {
  const { resource, workspace } = await resourceAccess(WorkspaceRecord, req.user, req.params.id, true);
  if (resource.kind !== req.params.kind) throw new HttpError(404, 'Record not found');
  const data = pick(req.body, fields);
  await validate(data, workspace);
  Object.assign(resource, data);
  await resource.save();
  res.json(resource);
}));
router.delete('/:kind/:id', handler(async (req, res) => {
  const { resource } = await resourceAccess(WorkspaceRecord, req.user, req.params.id, true);
  if (resource.kind !== req.params.kind) throw new HttpError(404, 'Record not found');
  await resource.deleteOne();
  res.json({ id: req.params.id });
}));
router.post('/:kind/:id/apply',handler(async(req,res)=>{
 const {resource:template,workspace}=await resourceAccess(WorkspaceRecord,req.user,req.params.id,true);
 if(template.kind!==req.params.kind||!['task-templates','workspace-templates'].includes(template.kind))throw new HttpError(400,'Record is not an applicable template');
 let result;
 await mongoose.connection.transaction(async session=>{
  const projectId=template.kind==='workspace-templates'?(await Project.create([{workspaceId:workspace._id,name:template.title,description:template.description}],{session}))[0]._id:template.projectId;
  [result]=await Task.create([{workspaceId:workspace._id,creatorId:req.user._id,title:template.title,description:template.description,projectId}],{session});
 });
 req.io?.to(String(workspace._id)).emit('task:created',result);res.status(201).json(result);
}));
export default router;
