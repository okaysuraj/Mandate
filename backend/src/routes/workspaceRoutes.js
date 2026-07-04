import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWorkspace,
  getWorkspaces,
  switchActiveWorkspace,
  getWorkspaceMembers,
  updateMemberRole
} from "../controllers/workspaceController.js";

const router = express.Router();

router.route("/").post(protect, createWorkspace).get(protect, getWorkspaces);
router.route("/:id/active").put(protect, switchActiveWorkspace);
router.route("/:id/members").get(protect, getWorkspaceMembers);
router.route("/:id/members/:userId").put(protect, updateMemberRole);

export default router;
