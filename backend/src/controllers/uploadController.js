import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "demo",
  api_key: process.env.CLOUDINARY_API_KEY || "demo",
  api_secret: process.env.CLOUDINARY_API_SECRET || "demo",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mandate_uploads",
    allowedFormats: ["jpg", "png", "jpeg", "pdf", "docx"],
    // transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

export const uploadFile = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Cloudinary returns the secure_url
    const fileUrl = req.file.path;

    res.status(200).json({
      name: req.file.originalname,
      url: fileUrl,
      type: req.file.mimetype,
      size: req.file.size,
    });
  } catch (error) {
    console.error("Error in uploadFile:", error);
    res.status(500).json({ message: "File upload failed" });
  }
};

export const uploadMiddleware = upload.single("file");
