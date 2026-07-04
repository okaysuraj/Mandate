import Task from "../models/Task.js";
import Activity from "../models/Activity.js";
import { runAutomations } from "./automationsController.js";

export const getTasks = async (req, res) => {
  try {
    const { status, priority, projectId, parentTaskId, page = 1, limit = 10 } = req.query;
    
    // Build query
    const query = { creatorId: req.user.id };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (projectId) query.projectId = projectId;
    if (parentTaskId) {
      if (parentTaskId === 'null' || parentTaskId === 'none') {
        query.parentTaskId = { $exists: false };
      } else {
        query.parentTaskId = parentTaskId;
      }
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const startIndex = (pageNumber - 1) * limitNumber;

    const total = await Task.countDocuments(query);
    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limitNumber);

    res.status(200).json({
      data: tasks,
      pagination: {
        total,
        page: pageNumber,
        pages: Math.ceil(total / limitNumber),
      },
    });
  } catch (error) {
    console.error("Error in getTasks controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.creatorId.toString() !== req.user.id && task.assigneeId?.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error("Error in getTaskById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, intent, status, priority, dueDate, projectId, workspaceId, parentTaskId, tags, timeSpent } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Please add a title" });
    }

    const task = await Task.create({
      title,
      description,
      intent,
      status,
      priority,
      dueDate,
      projectId,
      parentTaskId,
      tags,
      timeSpent,
      creatorId: req.user.id,
      workspaceId: workspaceId || req.user.activeWorkspace || req.user.id, // Fallback
    });
    
    // Log activity
    await Activity.create({
      entityType: "task",
      entityId: task._id,
      userId: req.user.id,
      action: "created",
    });
    
    if (req.io) {
      req.io.to(task.workspaceId.toString()).emit("task:created", task);
    }
    
    // Trigger automations asynchronously
    runAutomations("task_created", task, req.io);
    
    res.status(201).json(task);
  } catch (error) {
    import('fs').then(fs => fs.writeFileSync('error_log.txt', error.stack || error.message));
    console.error("Error in createTask controller", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.creatorId.toString() !== req.user.id && task.assigneeId?.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Track status completion
    if (req.body.status === "completed" && task.status !== "completed") {
      updatedTask.completedAt = new Date();
      await updatedTask.save();
      
      await Activity.create({
        entityType: "task",
        entityId: task._id,
        userId: req.user.id,
        action: "completed",
      });
    }

    if (req.io) {
      req.io.to(updatedTask.workspaceId?.toString()).emit("task:updated", updatedTask);
    }

    // Trigger automations asynchronously if status or priority changed
    if (req.body.status && req.body.status !== task.status) {
      runAutomations("status_changed", updatedTask, req.io);
    } else if (req.body.priority && req.body.priority !== task.priority) {
      runAutomations("priority_changed", updatedTask, req.io);
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error in updateTask controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.creatorId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await task.deleteOne();

    await Activity.create({
      entityType: "task",
      entityId: task._id,
      userId: req.user.id,
      action: "deleted",
    });

    if (req.io) {
      req.io.to(task.workspaceId?.toString()).emit("task:deleted", task._id);
    }

    res.status(200).json({ id: req.params.id, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error in deleteTask controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
