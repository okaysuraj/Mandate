import express from "express";
import { searchGlobal } from "../controllers/searchController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, searchGlobal);

export default router;
