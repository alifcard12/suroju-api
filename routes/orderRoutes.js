import express from "express";
import { addOrder, editOrder, deleteOrder, getOrders, updateOrderStatus, getOrder } from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getOrders);

// Menambahkan baru
router.post("/add", authMiddleware, addOrder);

// Mengedit berdasarkan ID
router.put("/:id", authMiddleware, editOrder);

// Menghapus berdasarkan ID
router.delete("/:id", authMiddleware, deleteOrder);

// Mengubah status berdasarkan ID
router.patch("/status/:id", authMiddleware, updateOrderStatus);

router.get("/:domain", getOrder);

export default router;
