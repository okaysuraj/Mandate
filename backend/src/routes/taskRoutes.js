import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  bulkAction,
  duplicateTask,
  reorderTasks,
  getAnalytics,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/analytics", protect, getAnalytics);

router.route("/")
  .get(protect, getTasks)
  .post(protect, createTask);

router.post("/bulk", protect, bulkAction);
router.put("/reorder", protect, reorderTasks);
router.post("/:id/duplicate", protect, duplicateTask);

router.route("/:id")
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, deleteTask);

export default router;
