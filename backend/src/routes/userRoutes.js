import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addProject, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/projects", protect, addProject);
router.put("/profile", protect, updateProfile);

export default router;
