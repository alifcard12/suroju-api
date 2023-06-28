import express from "express";
import { addTamu, editTamu, deleteTamu, getTamu } from "../controllers/tamuContoller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/tamu/",  getTamu);

// Menambahkan tamu baru
router.post("/tamu/add", authMiddleware, addTamu);

// Mengedit tamu berdasarkan ID
router.put("/tamu/:id", authMiddleware, editTamu);

// Menghapus tamu berdasarkan ID
router.delete("/tamu/:id", authMiddleware, deleteTamu);

export default router;
