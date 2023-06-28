import express from "express";
import multer from "multer";
import { getCovers, addCover, editCover, deleteCover, getCoverById } from "../controllers/coverController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/cover");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

// Inisialisasi multer dengan storage yang telah dikonfigurasi
const upload = multer({ storage: storage });

// Mengambil semua data Cover
router.get("/", authMiddleware, getCovers);

// Menambahkan data Cover baru
router.post("/add", authMiddleware, upload.fields([{ name: "imageCover", maxCount: 1 }]), addCover);

// Mengedit data Cover berdasarkan ID
router.put("/:id", authMiddleware, upload.fields([{ name: "imageCover", maxCount: 1 }]), editCover);

// Menghapus data Cover berdasarkan ID
router.delete("/:id", authMiddleware, deleteCover);

// Mengambil data Cover berdasarkan ID
router.get("/:id", authMiddleware, getCoverById);

export default router;
