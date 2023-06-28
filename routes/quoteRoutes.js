import express from "express";
import { addQuote, editQuote, deleteQuote, getQuotes, getQuotesByUserId } from "../controllers/quoteController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getQuotes);

// Menambahkan quote baru
router.post("/add", authMiddleware, addQuote);

// Mengedit quote berdasarkan ID
router.put("/:id", authMiddleware, editQuote);

// Menghapus quote berdasarkan ID
router.delete("/:id", authMiddleware, deleteQuote);

router.get("/user/:userId", getQuotesByUserId);

export default router;
