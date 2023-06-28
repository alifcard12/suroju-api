import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Rute login dengan Google menggunakan Passport.js
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Rute callback setelah autentikasi berhasil
router.get("/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
  // Mendapatkan data pengguna dari req.user setelah berhasil login
  const { id, email, role } = req.user;

  // Membuat payload token
  const payload = { id, email, role };

  // Menghasilkan token JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });

  // Menambahkan token ke cookie
  res.cookie("accessToken", token, { httpOnly: true });

  // Redirect ke halaman dashboard pada CLIENT_URL
  res.redirect(`${process.env.CLIENT_URL}/dashboard`);
});

export default router;
