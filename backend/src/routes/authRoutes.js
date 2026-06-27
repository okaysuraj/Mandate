import express from "express";
import { syncUser, getMe } from "../controllers/authController.js";
import { protect, verifyTokenOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/sync", verifyTokenOnly, syncUser);
router.get("/me", protect, getMe);

export default router;
