import express from "express";
import {
  getSuggestions,
  lockDailyMandate
} from "../controllers/planningController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/suggestions")
  .get(protect, getSuggestions);

router.route("/lock")
  .post(protect, lockDailyMandate);

export default router;
