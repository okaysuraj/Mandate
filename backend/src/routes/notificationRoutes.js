import express from "express";
import { getNotifications, markAsRead, deleteNotification, clearAllNotifications } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getNotifications)
  .delete(protect, clearAllNotifications);

router.route("/read").put(protect, markAsRead);
router.route("/:id").delete(protect, deleteNotification);

export default router;
