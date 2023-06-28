import express from "express";
import multer from "multer";
import { addGallery, editGallery, deleteGallery, getGallery, getGalleryById, getGalleryByUserId } from "../controllers/galleryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/gallery");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

// Inisialisasi multer dengan storage yang telah dikonfigurasi
const upload = multer({ storage: storage });

// Mendapatkan semua data galeri
router.get("/", authMiddleware, getGallery);

// Menambahkan data galeri baru
router.post("/add", authMiddleware, upload.fields([{ name: "imageUrl", maxCount: 10 }]), addGallery);

// Mengedit data galeri berdasarkan ID
router.put("/:id", authMiddleware, upload.single("image"), editGallery);

// Menghapus data galeri berdasarkan ID
router.delete("/:id", deleteGallery);

// Mengambil data galeri berdasarkan ID
router.get("/:id", authMiddleware, getGalleryById);

// Mengambil data galeri berdasarkan userId
router.get("/user/:userId", getGalleryByUserId);

export default router;
