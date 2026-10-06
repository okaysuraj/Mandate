import express from "express";
import { uploadMiddleware, uploadFile, getDownload } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, uploadMiddleware, uploadFile);

router.get("/:id/download", protect, getDownload);
export default router;
