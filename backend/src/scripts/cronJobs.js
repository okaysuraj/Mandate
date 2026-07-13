import cron from "node-cron";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import User from "../models/User.js";
import { runAutomations } from "../controllers/automationsController.js";
import { Expo } from "expo-server-sdk";

const expo = new Expo();

// Run every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
  console.log("Running midnight cron jobs...");
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1. Duplicate recurring tasks that were completed yesterday
    const completedRecurringTasks = await Task.find({
      status: "completed",
      recurrenceRule: { $exists: true, $ne: null },
      completedAt: { $gte: new Date(today.getTime() - 24 * 60 * 60 * 1000) }
    });

    for (const task of completedRecurringTasks) {
      // Basic rule parsing. For production, use true cron parser or RRule
      let nextDue = new Date(task.dueDate || today);
      if (task.recurrenceRule === "daily") {
        nextDue.setDate(nextDue.getDate() + 1);
      } else if (task.recurrenceRule === "weekly") {
        nextDue.setDate(nextDue.getDate() + 7);
      } else if (task.recurrenceRule === "monthly") {
        nextDue.setMonth(nextDue.getMonth() + 1);
      }

      const newTaskData = task.toObject();
      delete newTaskData._id;
      delete newTaskData.createdAt;
      delete newTaskData.updatedAt;
      delete newTaskData.completedAt;
      newTaskData.status = "pending";
      newTaskData.timeSpent = 0;
      newTaskData.dueDate = nextDue;

      await Task.create(newTaskData);
      console.log(`Duplicated recurring task: ${task.title}`);
    }

    // 2. Deadline warnings for tasks due within 24 hours
    const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
    const impendingTasks = await Task.find({
      status: { $ne: "completed" },
      dueDate: { $gte: today, $lte: tomorrow }
    });

    for (const task of impendingTasks) {
      const userId = task.assigneeId || task.creatorId;
      if (!userId) continue;

      await Notification.create({
        userId,
        title: "Deadline Approaching",
        message: `Task "${task.title}" is due soon.`,
        type: "reminder",
        relatedId: task._id,
        relatedModel: "Task"
      });
      console.log(`Created deadline warning for: ${task.title}`);

      // Send Push Notification
      try {
        const user = await User.findById(userId);
        if (user && user.expoPushToken && Expo.isExpoPushToken(user.expoPushToken)) {
          const messages = [{
            to: user.expoPushToken,
            sound: 'default',
            title: 'Deadline Approaching',
            body: `Task "${task.title}" is due soon.`,
            data: { taskId: task._id },
          }];
          const chunks = expo.chunkPushNotifications(messages);
          for (let chunk of chunks) {
            await expo.sendPushNotificationsAsync(chunk);
          }
          console.log(`Sent push notification to ${user.email} for task: ${task.title}`);
        }
      } catch (pushError) {
        console.error("Failed to send push notification:", pushError);
      }
    }

  } catch (err) {
    console.error("Error in cron jobs:", err);
  }
});

console.log("Cron jobs scheduled.");
