import express from "express";
import { suggestTaskBreakdown, parseSmartInput, detectBurnout } from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/task-breakdown", protect, suggestTaskBreakdown);
router.post("/parse-task", protect, parseSmartInput);
router.get("/burnout", protect, detectBurnout);

export default router;
