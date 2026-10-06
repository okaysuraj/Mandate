import { schemaPolicy, safeUrl } from './schemaPolicy.js';
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Task",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 10000,
    },
  },
  { timestamps: true, strict: "throw" }
);

commentSchema.index({ taskId: 1, createdAt: -1 });

schemaPolicy(commentSchema);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
