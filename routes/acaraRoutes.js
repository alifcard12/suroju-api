import express from "express";
import { addAcara, editAcara, deleteAcara, getAcaraAll, getAcaraByUserId, getAcara } from "../controllers/acaraController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/all", authMiddleware, getAcaraAll);

router.get("/", authMiddleware, getAcara);

// Menambahkan acara baru
router.post("/add", authMiddleware, addAcara);

// Mengedit acara berdasarkan ID
router.put("/:id", authMiddleware, editAcara);

// Menghapus acara berdasarkan ID
router.delete("/:id", authMiddleware, deleteAcara);

router.get("/user/:userId", getAcaraByUserId);

export default router;
