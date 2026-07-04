import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
} from "../controllers/documentController.js";

const router = express.Router();

router.route("/").post(protect, createDocument).get(protect, getDocuments);
router.route("/:id").get(protect, getDocumentById).put(protect, updateDocument).delete(protect, deleteDocument);

export default router;
