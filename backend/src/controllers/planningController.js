import Task from "../models/Task.js";
import DailyMandate from "../models/DailyMandate.js";

// @desc    Get task suggestions for today's mandate
// @route   GET /api/planning/suggestions
// @access  Private
export const getSuggestions = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Active tasks for user
    const query = { 
      creatorId: req.user.id,
      status: { $in: ["todo", "active", "blocked"] }
    };

    const tasks = await Task.find(query);

    const suggestions = {
      dueToday: [],
      overdue: [],
      highPriority: [],
      others: [],
    };

    tasks.forEach(task => {
      if (task.dueDate) {
        if (task.dueDate < today) {
          suggestions.overdue.push(task);
        } else if (task.dueDate >= today && task.dueDate < tomorrow) {
          suggestions.dueToday.push(task);
        } else if (task.priority === "high") {
          suggestions.highPriority.push(task);
        } else {
          suggestions.others.push(task);
        }
      } else if (task.priority === "high") {
        suggestions.highPriority.push(task);
      } else {
        suggestions.others.push(task);
      }
    });

    res.status(200).json(suggestions);
  } catch (error) {
    console.error("Error in getSuggestions", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// @desc    Lock in today's tasks
// @route   POST /api/planning/lock
// @access  Private
export const lockDailyMandate = async (req, res) => {
  try {
    const { taskIds, date } = req.body;
    // date should be "YYYY-MM-DD"

    if (!taskIds || !Array.isArray(taskIds) || taskIds.length === 0) {
      return res.status(400).json({ message: "Please provide task IDs to lock in" });
    }

    if (!date) {
      return res.status(400).json({ message: "Please provide a date string (YYYY-MM-DD)" });
    }

    // Check if daily mandate already exists for this date
    let dailyMandate = await DailyMandate.findOne({ userId: req.user.id, date });

    if (dailyMandate) {
      // Update existing
      dailyMandate.tasks = taskIds;
      dailyMandate.lockedAt = new Date();
      await dailyMandate.save();
    } else {
      // Create new
      dailyMandate = await DailyMandate.create({
        userId: req.user.id,
        date,
        lockedAt: new Date(),
        tasks: taskIds,
      });
    }

    // Optionally update task statuses to active
    await Task.updateMany(
      { _id: { $in: taskIds } },
      { $set: { status: "active", startDate: new Date() } }
    );

    res.status(200).json(dailyMandate);
  } catch (error) {
    console.error("Error in lockDailyMandate", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
