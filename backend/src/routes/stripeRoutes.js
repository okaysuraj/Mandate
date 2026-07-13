import express from "express";
import { createCheckoutSession, webhook } from "../controllers/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for creating a checkout session
router.post("/create-checkout-session", protect, createCheckoutSession);

// Webhook route needs raw body parser, handled in server.js before body-parser
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

export default router;
