import express from "express";
import { register, login, logout, getUserProfile, getAllUsers, updateRole, deleteUser } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Rute registrasi pengguna
router.post("/register", register);

// Rute login pengguna
router.post("/login", login);

// Rute logout pengguna
router.post("/logout", logout);

router.get("/all", authMiddleware, getAllUsers);

router.get("/profile", authMiddleware, getUserProfile);

// Rute untuk memperbarui peran pengguna (hanya admin yang dapat mengakses)
router.put("/:userId", authMiddleware, updateRole);

router.delete("/:userId", authMiddleware, deleteUser);

export default router;
