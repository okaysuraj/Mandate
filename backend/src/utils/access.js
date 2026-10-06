import Workspace from '../models/Workspace.js';
import { HttpError } from './http.js';

export const idString = value => String(value?._id ?? value ?? '');
export const assertId = (value, name = 'id') => {
  if (typeof value !== 'string' || !/^[a-f\d]{24}$/i.test(value)) throw new HttpError(400, `Invalid ${name}`);
  return value;
};
export const roleFor = (workspace, userId) => {
  if (idString(workspace.owner) === idString(userId)) return 'Owner';
  return workspace.members.find(member => idString(member.user) === idString(userId))?.role;
};
export const workspaceAccess = async (user, value, write = false, admin = false) => {
  const workspaceId = idString(value || user.activeWorkspace);
  assertId(workspaceId, 'workspaceId');
  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) throw new HttpError(404, 'Workspace not found');
  const role = roleFor(workspace, user._id);
  if (!role || (write && role === 'Viewer') || (admin && !['Owner', 'Admin'].includes(role))) throw new HttpError(403, 'Workspace permission denied');
  return workspace;
};
export const resourceAccess = async (Model, user, id, write = false, admin = false) => {
  assertId(id);
  const resource = await Model.findById(id);
  if (!resource) throw new HttpError(404, `${Model.modelName} not found`);
  const workspace = await workspaceAccess(user, resource.workspaceId, write, admin);
  return { resource, workspace };
};
export const workspaceIdsFor = async user => (await Workspace.find({ $or: [{ owner: user._id }, { 'members.user': user._id }] }).select('_id').lean()).map(w => w._id);
export const validateReferences = async (body, workspace, Model, field, array = false) => {
  if (body[field] === undefined || body[field] === null) return;
  const ids = array ? body[field] : [body[field]];
  if (!Array.isArray(ids) || ids.length > 200) throw new HttpError(400, `Invalid ${field}`);
  ids.forEach(id => assertId(id, field));
  const uniqueIds = [...new Set(ids)];
  const count = await Model.countDocuments({ _id: { $in: uniqueIds }, workspaceId: workspace._id });
  if (count !== uniqueIds.length) throw new HttpError(400, `${field} must belong to this workspace`);
};
export const validateMembers = (body, workspace, field, array = false) => {
  if (body[field] === undefined || body[field] === null) return;
  const ids = array ? body[field] : [body[field]];
  if (!Array.isArray(ids) || ids.length > 200) throw new HttpError(400, `Invalid ${field}`);
  const members = new Set([idString(workspace.owner), ...workspace.members.map(m => idString(m.user))]);
  for (const id of ids) if (!members.has(assertId(id, field))) throw new HttpError(400, `${field} must be a workspace member`);
};
