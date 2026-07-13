import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addProject, updateProfile, registerPushToken } from "../controllers/userController.js";

const router = express.Router();

router.post("/projects", protect, addProject);
router.put("/profile", protect, updateProfile);
router.post("/push-token", protect, registerPushToken);

export default router;
