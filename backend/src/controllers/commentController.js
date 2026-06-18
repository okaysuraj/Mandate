import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ todoId: req.params.todoId })
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
    
    // Get Todo to find workspaceId
    const Todo = (await import("../models/Todo.js")).default;
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    const comment = await Comment.create({
      todoId: req.params.todoId,
      user: req.user.id,
      content,
    });
    const populated = await comment.populate("user", "name email");

    if (req.io) {
      req.io.to(todo.workspaceId.toString()).emit("comment_created", populated);
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
    
    // Get Todo to find workspaceId for broadcasting
    const Todo = (await import("../models/Todo.js")).default;
    const todo = await Todo.findById(comment.todoId);
    if (todo && req.io) {
      req.io.to(todo.workspaceId.toString()).emit("comment_deleted", { commentId: req.params.id, todoId: todo._id });
    }

    res.json({ message: "Comment removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
