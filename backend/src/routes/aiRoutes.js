import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { suggestTaskBreakdown, parseSmartInput } from "../controllers/aiController.js";

const router = express.Router();

router.post("/task-breakdown", protect, suggestTaskBreakdown);
router.post("/parse-task", protect, parseSmartInput);

export default router;
