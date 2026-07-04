import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ taskId: req.params.taskId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    
    // Get Task to find workspaceId
    const Task = (await import("../models/Task.js")).default;
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const comment = await Comment.create({
      taskId: req.params.taskId,
      user: req.user.id,
      content,
    });
    const populated = await comment.populate("user", "name email");

    if (req.io) {
      req.io.to(task.workspaceId.toString()).emit("comment_created", populated);
    }

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await comment.deleteOne();
    
    // Get Task to find workspaceId for broadcasting
    const Task = (await import("../models/Task.js")).default;
    const task = await Task.findById(comment.taskId);
    if (task && req.io) {
      req.io.to(task.workspaceId.toString()).emit("comment_deleted", { commentId: req.params.id, taskId: task._id });
    }

    res.json({ message: "Comment removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
