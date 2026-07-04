import Document from "../models/Document.js";

export const createDocument = async (req, res) => {
  try {
    const { title, content, parentDocId, workspaceId } = req.body;
    const doc = await Document.create({
      title: title || "Untitled Document",
      content,
      parentDocId,
      workspaceId,
      author: req.user.id
    });
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const { workspaceId, parentDocId } = req.query;
    const query = { workspaceId };
    
    // If parentDocId is provided, filter by it. If strictly 'null', fetch root docs.
    if (parentDocId !== undefined) {
      query.parentDocId = parentDocId === 'null' ? null : parentDocId;
    }

    const docs = await Document.find(query).sort({ updatedAt: -1 });
    res.json(docs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getDocumentById = async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: "Document not found" });
    res.json(doc);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const doc = await Document.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: "Document not found" });
    
    // Also delete child docs recursively (simple version: just delete direct children)
    await Document.deleteMany({ parentDocId: doc._id });

    res.json({ message: "Document removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
