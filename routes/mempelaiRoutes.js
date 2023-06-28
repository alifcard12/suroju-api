import express from "express";
import multer from "multer";
import { addMempelai, editMempelaiPria, deleteMempelai, getMempelai, getMempelaiById, getMempelaiByUserId, editMempelaiWanita, editPosisiMempelai } from "../controllers/mempelaiContoller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Konfigurasi storage untuk multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

// Inisialisasi multer dengan storage yang telah dikonfigurasi
const upload = multer({ storage: storage });

router.get("/", authMiddleware, getMempelai);

// Menambahkan data Mempelai baru
router.post(
  "/add",
  authMiddleware,
  upload.fields([
    { name: "fotoPria", maxCount: 1 },
    { name: "fotoWanita", maxCount: 1 },
  ]),
  addMempelai
);

// Mengedit data Mempelai berdasarkan ID
router.put("/pria/:id", authMiddleware, upload.fields([{ name: "fotoPria", maxCount: 1 }]), editMempelaiPria);
// Mengedit data Mempelai berdasarkan ID
router.put("/wanita/:id", authMiddleware, upload.fields([{ name: "fotoWanita", maxCount: 1 }]), editMempelaiWanita);

// Menghapus data Mempelai berdasarkan ID
router.delete("/:id", deleteMempelai);

// Mengambil data Mempelai berdasarkan ID
router.get("/:id", authMiddleware, getMempelaiById);
router.put("/posisi/:id", authMiddleware, editPosisiMempelai);

// Mengambil data Mempelai berdasarkan userId
router.get("/user/:userId", getMempelaiByUserId);

export default router;
