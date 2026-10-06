import Comment from '../models/Comment.js';
import Task from '../models/Task.js';
import { resourceAccess, assertId, idString, roleFor } from '../utils/access.js';
import { handler, pagination, HttpError } from '../utils/http.js';
export const getComments = handler(async (req, res) => {
  await resourceAccess(Task, req.user, req.params.taskId);
  const { limit, skip } = pagination(req.query);
  res.json(await Comment.find({ taskId: req.params.taskId }).populate('user', 'name email avatar').sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit));
});
export const addComment = handler(async (req, res) => {
  const { resource: task } = await resourceAccess(Task, req.user, req.params.taskId, true);
  const comment = await Comment.create({ taskId: task._id, user: req.user._id, content: req.body.content });
  await comment.populate('user', 'name email avatar');
  req.io?.to(idString(task.workspaceId)).emit('comment_created', comment);
  res.status(201).json(comment);
});
export const deleteComment = handler(async (req, res) => {
  assertId(req.params.id);
  const comment = await Comment.findById(req.params.id);
  if (!comment) throw new HttpError(404, 'Comment not found');
  const { resource: task, workspace } = await resourceAccess(Task, req.user, idString(comment.taskId), true);
  if (idString(comment.user) !== idString(req.user._id) && !['Owner', 'Admin'].includes(roleFor(workspace, req.user._id))) throw new HttpError(403, 'Comment permission denied');
  await comment.deleteOne();
  req.io?.to(idString(task.workspaceId)).emit('comment_deleted', { commentId: req.params.id, taskId: task._id });
  res.json({ message: 'Comment deleted' });
});
