import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAutomation,
  getAutomations,
  updateAutomation,
  deleteAutomation
} from "../controllers/automationsController.js";

const router = express.Router();

router.route("/").post(protect, createAutomation).get(protect, getAutomations);
router.route("/:id").put(protect, updateAutomation).delete(protect, deleteAutomation);

export default router;
