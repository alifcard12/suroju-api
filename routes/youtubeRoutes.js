import express from "express";
import { addYoutube, editYoutube, deleteYoutube, getYoutubeList, getYoutubeByUser } from "../controllers/youtubeController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getYoutubeList);

// Menambahkan data Youtube baru
router.post("/add", authMiddleware, addYoutube);

// Mengedit data Youtube berdasarkan ID
router.put("/:id", authMiddleware, editYoutube);

// Menghapus data Youtube berdasarkan ID
router.delete("/:id", authMiddleware, deleteYoutube);

// Mendapatkan data Youtube berdasarkan ID pengguna
router.get("/:userId", authMiddleware, getYoutubeByUser);

export default router;
