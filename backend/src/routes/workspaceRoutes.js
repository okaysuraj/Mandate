import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWorkspace,
  getWorkspaces,
  switchActiveWorkspace,
} from "../controllers/workspaceController.js";

const router = express.Router();

router.route("/").post(protect, createWorkspace).get(protect, getWorkspaces);
router.route("/:id/active").put(protect, switchActiveWorkspace);

export default router;
