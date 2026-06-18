import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addProject } from "../controllers/userController.js";

const router = express.Router();

router.post("/projects", protect, addProject);

export default router;
