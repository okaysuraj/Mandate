import express from "express";
import { uploadMiddleware, uploadFile } from "../controllers/uploadController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, uploadMiddleware, uploadFile);

export default router;
