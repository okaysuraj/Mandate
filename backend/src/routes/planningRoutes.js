import express from "express";
import {
  getSuggestions,
  getMandateHistory,
  getDailyMandate,
  lockDailyMandate
} from "../controllers/planningController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/suggestions")
  .get(protect, getSuggestions);

router.route("/daily")
  .get(protect, getDailyMandate);

router.route("/lock")
  .post(protect, lockDailyMandate);

router.get("/history",protect,getMandateHistory);
export default router;
