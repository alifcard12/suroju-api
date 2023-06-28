import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, role, username } = req.body;

    // Cek apakah pengguna dengan email yang sama sudah terdaftar
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    // Hash kata sandi menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat objek pengguna baru
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
      role,
    });

    // Simpan pengguna ke basis data
    await newUser.save();

    res.status(201).json({ message: "User berhasil terdaftar" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Temukan pengguna berdasarkan email
    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, "Pengguna tidak ditemukan"));
    }

    // Verifikasi kata sandi menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(createError(400, "Kata sandi tidak valid"));
    }

    // Generate token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    // Kirim token sebagai respons
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json({
      id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .send("Berhasil keluar");
};

export const getUserProfile = async (req, res, next) => {
  try {
    // Mendapatkan informasi pengguna dari objek request
    const userId = req.userId;

    // Menggunakan userId untuk mengambil informasi pengguna dari basis data
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "User not found"));
    }

    // Menghapus kata sandi dari data pengguna
    const { password, ...userInfo } = user._doc;

    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil profil pengguna" });
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const userRole = req.userRole;

    // Periksa jika pengguna memiliki peran admin
    if (userRole !== "admin") {
      return next(createError(403, "Akses tidak diizinkan"));
    }

    const users = await User.find();

    // Hapus bidang password dari setiap data pengguna
    const usersWithoutPasswords = users.map((user) => {
      const { password, ...userInfo } = user._doc;
      return userInfo;
    });

    res.status(200).json(usersWithoutPasswords);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil daftar pengguna" });
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Cek apakah pengguna dengan ID yang diberikan ada di database
    const user = await User.findById(userId);

    if (!user) {
      return next(createError(404, "Pengguna tidak ditemukan"));
    }

    // Perbarui peran pengguna
    user.role = role;

    // Simpan perubahan di database
    await user.save();

    res.status(200).json({ message: "Peran pengguna berhasil diperbarui" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Hapus pengguna dari basis data berdasarkan ID
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};
