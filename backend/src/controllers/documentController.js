import Document from '../models/Document.js';
import { resourceController } from '../utils/resourceController.js';
import { validateReferences, idString } from '../utils/access.js';
import { HttpError } from '../utils/http.js';
const controller = resourceController(Document, ['title', 'content', 'parentDocId'], {
  defaults: req => ({ author: req.user._id }),
  validate: async (body, workspace, doc) => {
    await validateReferences(body, workspace, Document, 'parentDocId');
    let parent = body.parentDocId;
    const visited = new Set();
    while (parent) {
      if (idString(parent) === idString(doc?._id) || visited.has(idString(parent))) throw new HttpError(400, 'Document hierarchy cannot contain a cycle');
      visited.add(idString(parent));
      parent = (await Document.findOne({ _id: parent, workspaceId: workspace._id }))?.parentDocId;
    }
  },
  afterDelete: (doc,options) => Document.updateMany({ workspaceId: doc.workspaceId, parentDocId: doc._id }, { $set: { parentDocId: doc.parentDocId || null } }, { runValidators: true,...options })
});
export const { create: createDocument, list: getDocuments, get: getDocumentById, update: updateDocument, delete: deleteDocument } = controller;
