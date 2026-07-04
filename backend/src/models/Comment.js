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
    },
  },
  { timestamps: true }
);

commentSchema.index({ taskId: 1, createdAt: -1 });

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
