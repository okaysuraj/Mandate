import cron from "node-cron";
import Task from "../models/Task.js";
import Notification from "../models/Notification.js";
import { Server } from "socket.io";

// Initialize cron jobs
export const initReminderService = (io) => {
  // Run every minute
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();
      // Look for tasks due in the next 15 minutes that haven't been reminded yet
      // For simplicity in this demo, we'll just check tasks due exactly in 15 mins (rounded to minute)
      const in15Mins = new Date(now.getTime() + 15 * 60000);
      
      const upcomingTasks = await Task.find({
        status: { $ne: "completed" },
        dueDate: {
          $gte: new Date(in15Mins.setSeconds(0, 0)),
          $lte: new Date(in15Mins.setSeconds(59, 999))
        }
      });

      for (const task of upcomingTasks) {
        // Create notification for the creator
        const notification = await Notification.create({
          user: task.creatorId,
          title: "Upcoming Deadline",
          message: `Task "${task.title}" is due in 15 minutes!`,
          type: "reminder",
          relatedEntityId: task._id,
          workspaceId: task.workspaceId
        });

        // Broadcast to specific user room if we were tracking individual user rooms,
        // but since we track workspaces, broadcast to workspace
        if (io) {
          io.to(task.workspaceId?.toString()).emit("notification_created", notification);
        }

        // Create notification for assignee if different from creator
        if (task.assigneeId && task.assigneeId.toString() !== task.creatorId.toString()) {
          const assigneeNotif = await Notification.create({
            user: task.assigneeId,
            title: "Upcoming Deadline",
            message: `Task "${task.title}" assigned to you is due in 15 minutes!`,
            type: "reminder",
            relatedEntityId: task._id,
            workspaceId: task.workspaceId
          });
          if (io) {
            io.to(task.workspaceId?.toString()).emit("notification_created", assigneeNotif);
          }
        }
      }
    } catch (error) {
      console.error("Reminder service error:", error);
    }
  });

  console.log("Reminder service initialized.");
};
