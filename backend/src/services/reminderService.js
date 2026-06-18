import cron from "node-cron";
import Todo from "../models/Todo.js";
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
      
      const upcomingTodos = await Todo.find({
        status: { $ne: "completed" },
        isDeleted: false,
        dueDate: {
          $gte: new Date(in15Mins.setSeconds(0, 0)),
          $lte: new Date(in15Mins.setSeconds(59, 999))
        }
      });

      for (const todo of upcomingTodos) {
        // Create notification for the creator
        const notification = await Notification.create({
          user: todo.user,
          title: "Upcoming Deadline",
          message: `Task "${todo.title}" is due in 15 minutes!`,
          type: "reminder",
          relatedEntityId: todo._id,
          workspaceId: todo.workspaceId
        });

        // Broadcast to specific user room if we were tracking individual user rooms,
        // but since we track workspaces, broadcast to workspace
        if (io) {
          io.to(todo.workspaceId?.toString()).emit("notification_created", notification);
        }

        // Create notifications for assignees
        if (todo.assignees && todo.assignees.length > 0) {
          for (const assigneeId of todo.assignees) {
            if (assigneeId.toString() !== todo.user.toString()) {
              const assigneeNotif = await Notification.create({
                user: assigneeId,
                title: "Upcoming Deadline",
                message: `Task "${todo.title}" assigned to you is due in 15 minutes!`,
                type: "reminder",
                relatedEntityId: todo._id,
                workspaceId: todo.workspaceId
              });
              if (io) {
                io.to(todo.workspaceId?.toString()).emit("notification_created", assigneeNotif);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Reminder service error:", error);
    }
  });

  console.log("Reminder service initialized.");
};
