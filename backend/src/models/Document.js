import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String, // Storing Markdown or rich text HTML
      default: "",
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    parentDocId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      default: null, // For nested pages
    }
  },
  { timestamps: true }
);

documentSchema.index({ workspaceId: 1, parentDocId: 1 });

const Document = mongoose.model("Document", documentSchema);

export default Document;
