import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Activity from "../models/Activity.js";
import Task from "../models/Task.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const { workspaceId, limit = 20 } = req.query;
    
    // Simple approach: get activities for tasks in this workspace
    // Or just all activities for the user
    const activities = await Activity.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
      
    // Populate some basic info if needed, but we can just return them
    res.status(200).json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
