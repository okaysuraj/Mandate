import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Task from "../models/Task.js";
import User from "../models/User.js";

async function seed() {
  await connectDB();
  const users = await User.find({});
  console.log(`Found ${users.length} users`);

  for (const user of users) {
    const filter = {
      $or: [{ creatorId: user._id }, { workspaceId: user.activeWorkspace }]
    };
    const count = await Task.countDocuments(filter);
    console.log(`User ${user.email} (${user._id}) has ${count} tasks`);

    if (count === 0) {
      const now = new Date();
      const starterTasks = [
        {
          title: "API Gateway Protocol Setup",
          description: "Configure OAuth2 token verification and rate limiting rules for public endpoints.",
          status: "pending",
          priority: "urgent",
          creatorId: user._id,
          workspaceId: user.activeWorkspace,
          tags: ["backend", "security"],
          dueDate: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
        },
        {
          title: "Database Index Optimization",
          description: "Add compound indices on workspaceId and createdAt for high-throughput queries.",
          status: "in-progress",
          priority: "high",
          creatorId: user._id,
          workspaceId: user.activeWorkspace,
          tags: ["database", "performance"],
          dueDate: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000)
        },
        {
          title: "Global Search Suggestions UI",
          description: "Implement fuzzy match search debounce and command palette shortcut bindings.",
          status: "validation",
          priority: "medium",
          creatorId: user._id,
          workspaceId: user.activeWorkspace,
          tags: ["frontend", "ui"],
          dueDate: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000)
        },
        {
          title: "User Profile Avatar Sync",
          description: "Connect Cloudinary image processing pipeline for high-res profile badges.",
          status: "completed",
          priority: "high",
          creatorId: user._id,
          workspaceId: user.activeWorkspace,
          tags: ["media", "profile"],
          dueDate: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000)
        },
        {
          title: "System Notification Bell Dropdown",
          description: "Real-time WebSocket event listeners for incoming mandate assignment alerts.",
          status: "completed",
          priority: "medium",
          creatorId: user._id,
          workspaceId: user.activeWorkspace,
          tags: ["notifications", "socket"],
          dueDate: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
        }
      ];

      await Task.insertMany(starterTasks);
      console.log(`Seeded 5 starter tasks for ${user.email}`);
    }
  }

  process.exit(0);
}

seed().catch(err => {
  console.error("Seed error:", err);
  process.exit(1);
});
