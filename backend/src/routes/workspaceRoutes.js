import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWorkspace,
  getWorkspace, updateWorkspace, transferOwnership,
  getWorkspaces,
  switchActiveWorkspace,
  getWorkspaceMembers,
  addWorkspaceMember,
  updateMemberRole,
  toggleIntegration
} from "../controllers/workspaceController.js";

const router = express.Router();

router.route("/").post(protect, createWorkspace).get(protect, getWorkspaces);
router.route("/:id/active").put(protect, switchActiveWorkspace);
router.route("/:id/members").get(protect, getWorkspaceMembers).post(protect, addWorkspaceMember);
router.route("/:id/members/:userId").put(protect, updateMemberRole);
router.route("/:id/integrations").put(protect, toggleIntegration);

router.route("/:id").get(protect, getWorkspace).put(protect, updateWorkspace);
router.put("/:id/owner", protect, transferOwnership);
export default router;
