import Mempelai from "../models/mempelaiModel.js";
import createError from "../utils/createError.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mendapatkan semua data Mempelai
export const getMempelai = async (req, res, next) => {
  try {
    const userId = req.userId;

    const mempelai = await Mempelai.find({ userId });

    res.status(200).json(mempelai);
  } catch (error) {
    next(error);
  }
};

// Menambahkan data Mempelai
export const addMempelai = async (req, res, next) => {
  try {
    const { mempelaiPria, mempelaiWanita, namaPanggilanPria, namaPanggilanWanita, ayahPria, ayahWanita, ibuPria, ibuWanita, posisiMempelai } = req.body;

    const userId = req.userId;

    const existingMempelai = await Mempelai.findOne({ userId });

    if (existingMempelai) {
      return next(createError(400, "Anda sudah memiliki data Mempelai"));
    }

    const fotoPria = req.files && req.files["fotoPria"] ? "/images/" + req.files["fotoPria"][0].filename : "";
    const fotoWanita = req.files && req.files["fotoWanita"] ? "/images/" + req.files["fotoWanita"][0].filename : "";

    const mempelai = new Mempelai({
      userId,
      mempelaiPria,
      mempelaiWanita,
      namaPanggilanPria,
      namaPanggilanWanita,
      ayahPria,
      ayahWanita,
      ibuPria,
      ibuWanita,
      posisiMempelai,
      fotoPria,
      fotoWanita,
    });

    const savedMempelai = await mempelai.save();

    // Mendapatkan URL gambar
    savedMempelai.fotoPria = req.protocol + "://" + req.get("host") + "/images/" + savedMempelai.fotoPria;
    savedMempelai.fotoWanita = req.protocol + "://" + req.get("host") + "/images/" + savedMempelai.fotoWanita;

    res.status(201).json(savedMempelai);
  } catch (error) {
    next(error);
  }
};

// Mengedit data Mempelai berdasarkan ID
export const editMempelaiPria = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { mempelaiPria, namaPanggilanPria, ayahPria, ibuPria } = req.body;

    const mempelai = await Mempelai.findById(id);

    if (!mempelai) {
      return next(createError(404, "Data Mempelai tidak ditemukan"));
    }

    mempelai.mempelaiPria = mempelaiPria;
    mempelai.namaPanggilanPria = namaPanggilanPria;
    mempelai.ayahPria = ayahPria;
    mempelai.ibuPria = ibuPria;

    if (req.files && req.files["fotoPria"]) {
      // Hapus file gambar sebelumnya
      const previousFotoPriaPath = path.join(__dirname, "../public", mempelai.fotoPria.slice(1));
      if (fs.existsSync(previousFotoPriaPath)) {
        fs.unlinkSync(previousFotoPriaPath);
      }

      mempelai.fotoPria = "/images/" + req.files["fotoPria"][0].filename;
    }

    const updatedMempelai = await mempelai.save();

    // Mendapatkan URL gambar
    updatedMempelai.fotoPria = req.protocol + "://" + req.get("host") + updatedMempelai.fotoPria;

    res.json(updatedMempelai);
  } catch (error) {
    next(error);
  }
};

// Mengedit data Mempelai berdasarkan ID
export const editMempelaiWanita = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { mempelaiWanita, namaPanggilanWanita, ayahWanita, ibuWanita } = req.body;

    const mempelai = await Mempelai.findById(id);

    if (!mempelai) {
      return next(createError(404, "Data Mempelai tidak ditemukan"));
    }

    mempelai.mempelaiWanita = mempelaiWanita;
    mempelai.namaPanggilanWanita = namaPanggilanWanita;
    mempelai.ayahWanita = ayahWanita;
    mempelai.ibuWanita = ibuWanita;

    if (req.files && req.files["fotoWanita"]) {
      // Hapus file gambar sebelumnya
      const previousFotoWanitaPath = path.join(__dirname, "../public", mempelai.fotoWanita.slice(1));
      if (fs.existsSync(previousFotoWanitaPath)) {
        fs.unlinkSync(previousFotoWanitaPath);
      }

      mempelai.fotoWanita = "/images/" + req.files["fotoWanita"][0].filename;
    }

    const updatedMempelai = await mempelai.save();

    // Mendapatkan URL gambar
    updatedMempelai.fotoWanita = req.protocol + "://" + req.get("host") + updatedMempelai.fotoWanita;

    res.json(updatedMempelai);
  } catch (error) {
    next(error);
  }
};

// Menghapus data Mempelai berdasarkan ID
export const deleteMempelai = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mempelai = await Mempelai.findById(id);

    if (!mempelai) {
      return next(createError(404, "Data Mempelai tidak ditemukan"));
    }

    // Hapus file gambar
    if (mempelai.fotoPria) {
      const fotoPriaPath = path.join(__dirname, "../public", mempelai.fotoPria);
      fs.unlinkSync(fotoPriaPath);
    }

    if (mempelai.fotoWanita) {
      const fotoWanitaPath = path.join(__dirname, "../public", mempelai.fotoWanita);
      fs.unlinkSync(fotoWanitaPath);
    }

    const deletedMempelai = await Mempelai.findByIdAndDelete(id);

    res.json({ message: "Data Mempelai berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// Mengambil data Mempelai berdasarkan ID
export const getMempelaiById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mempelai = await Mempelai.findById(id);

    if (!mempelai) {
      return next(createError(404, "Data Mempelai tidak ditemukan"));
    }

    res.status(200).json(mempelai);
  } catch (error) {
    next(error);
  }
};

// Mengambil data Mempelai berdasarkan userId
export const getMempelaiByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const mempelai = await Mempelai.find({ userId });

    res.status(200).json(mempelai);
  } catch (error) {
    next(error);
  }
};

// Mengedit data Posisi Mempelai berdasarkan ID
export const editPosisiMempelai = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { posisiMempelai } = req.body;

    const mempelai = await Mempelai.findById(id);

    if (!mempelai) {
      return next(createError(404, "Data Mempelai tidak ditemukan"));
    }

    mempelai.posisiMempelai = posisiMempelai;

    const updatedMempelai = await mempelai.save();

    res.json(updatedMempelai);
  } catch (error) {
    next(error);
  }
};
