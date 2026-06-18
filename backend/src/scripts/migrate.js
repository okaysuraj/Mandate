import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import User from "../models/User.js";
import Workspace from "../models/Workspace.js";
import Todo from "../models/Todo.js";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/mandate");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const runMigration = async () => {
  await connectDB();
  console.log("Starting database migration...");

  try {
    // 1. Ensure all Users have a personal workspace
    const users = await User.find({});
    console.log(`Found ${users.length} users.`);

    for (const user of users) {
      let workspace = await Workspace.findOne({ owner: user._id, name: "Personal Workspace" });
      
      if (!workspace) {
        console.log(`Creating Personal Workspace for user: ${user.email}`);
        workspace = await Workspace.create({
          name: "Personal Workspace",
          owner: user._id,
          members: [{ user: user._id, role: "Admin" }],
        });
      }

      if (!user.activeWorkspace) {
        user.activeWorkspace = workspace._id;
        await user.save();
        console.log(`Updated activeWorkspace for user: ${user.email}`);
      }
      
      // 2. Ensure all Todos for this user have a workspaceId
      const unassignedTodos = await Todo.find({ user: user._id, workspaceId: { $exists: false } });
      if (unassignedTodos.length > 0) {
        console.log(`Assigning ${unassignedTodos.length} old todos to Personal Workspace for user: ${user.email}`);
        await Todo.updateMany(
          { user: user._id, workspaceId: { $exists: false } },
          { $set: { workspaceId: workspace._id } }
        );
      }
    }

    console.log("Migration completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    process.exit(0);
  }
};

runMigration();
