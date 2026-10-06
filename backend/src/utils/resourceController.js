import mongoose from 'mongoose';
import { handler, pick, pagination, HttpError } from './http.js';
import { workspaceAccess, resourceAccess } from './access.js';
export const resourceController = (Model, fields, { validate = async () => {}, defaults = () => ({}), populate, afterDelete = async () => {}, admin = false } = {}) => {
  const serialize = async doc => populate ? doc.populate(populate) : doc;
  return {
    list: handler(async (req, res) => {
      const workspace = await workspaceAccess(req.user, req.query.workspaceId);
      const { page, limit, skip } = pagination(req.query);
      let query = Model.find({ workspaceId: workspace._id }).sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit);
      if (req.query.view && req.query.view !== 'options') throw new HttpError(400,'Unsupported record view');
      if (req.query.view === 'options') query = query.select('title name workspaceId');
      if (populate) query = query.populate(populate);
      if (req.query.paginate === 'true') {
        const [data,total] = await Promise.all([query.lean(),Model.countDocuments({workspaceId:workspace._id})]);
        res.json({data,pagination:{page,limit,total,pages:Math.ceil(total/limit)}});
      } else res.json(await query.lean());
    }),
    get: handler(async (req, res) => {
      const { resource } = await resourceAccess(Model, req.user, req.params.id);
      res.json(await serialize(resource));
    }),
    create: handler(async (req, res) => {
      const workspace = await workspaceAccess(req.user, req.body.workspaceId, true, admin);
      const data = pick(req.body, fields);
      await validate(data, workspace);
      const doc = await Model.create({ ...data, ...defaults(req), workspaceId: workspace._id });
      res.status(201).json(await serialize(doc));
    }),
    update: handler(async (req, res) => {
      const { resource, workspace } = await resourceAccess(Model, req.user, req.params.id, true, admin);
      if (req.body.workspaceId && String(req.body.workspaceId) !== String(workspace._id)) throw new HttpError(400, 'Moving records between workspaces is not supported');
      const data = pick(req.body, fields);
      await validate(data, workspace, resource);
      Object.assign(resource, data);
      await resource.save();
      res.json(await serialize(resource));
    }),
    delete: handler(async (req, res) => {
      const { resource } = await resourceAccess(Model, req.user, req.params.id, true, admin);
      await mongoose.connection.transaction(async session=>{await afterDelete(resource,{session});await resource.deleteOne({session});});
      res.json({ id: req.params.id, message: `${Model.modelName} deleted` });
    })
  };
};
