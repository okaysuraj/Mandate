import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal
} from "../controllers/goalController.js";

const router = express.Router();

router.route("/").post(protect, createGoal).get(protect, getGoals);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

export default router;
