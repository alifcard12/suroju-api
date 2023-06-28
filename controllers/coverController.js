import Cover from "../models/coverModel.js";
import createError from "../utils/createError.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mendapatkan semua data Cover
export const getCovers = async (req, res, next) => {
  try {
    const userId = req.userId;

    const covers = await Cover.find({ userId });

    res.status(200).json(covers);
  } catch (error) {
    next(error);
  }
};

// Menambahkan data Cover
export const addCover = async (req, res, next) => {
  try {
    const { judul, namaMempelai } = req.body;

    const userId = req.userId;

    const existingCover = await Cover.findOne({ userId });

    if (existingCover) {
      return next(createError(400, "Anda sudah memiliki data Cover"));
    }

    const imageCover = req.files && req.files["imageCover"] ? "/cover/" + req.files["imageCover"][0].filename : "";

    const cover = new Cover({
      userId,
      judul,
      namaMempelai,
      imageCover,
    });

    const savedCover = await cover.save();

    // Mendapatkan URL gambar
    savedCover.imageCover = req.protocol + "://" + req.get("host") + "/cover/" + savedCover.imageCover;

    res.status(201).json(savedCover);
  } catch (error) {
    next(error);
  }
};

// Mengedit data Cover berdasarkan ID
export const editCover = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { judul, namaMempelai } = req.body;

    const cover = await Cover.findById(id);

    if (!cover) {
      return next(createError(404, "Data Cover tidak ditemukan"));
    }

    cover.judul = judul;
    cover.namaMempelai = namaMempelai;

    if (req.files && req.files["imageCover"]) {
      // Hapus file gambar sebelumnya
      const previousImageCoverPath = path.join(__dirname, "../public", cover.imageCover.slice(1));
      if (fs.existsSync(previousImageCoverPath)) {
        fs.unlinkSync(previousImageCoverPath);
      }

      cover.imageCover = "/cover/" + req.files["imageCover"][0].filename;
    }

    const updatedCover = await cover.save();

    // Mendapatkan URL gambar
    updatedCover.imageCover = req.protocol + "://" + req.get("host") + updatedCover.imageCover;

    res.json(updatedCover);
  } catch (error) {
    next(error);
  }
};

// Menghapus data Cover berdasarkan ID
export const deleteCover = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cover = await Cover.findById(id);

    if (!cover) {
      return next(createError(404, "Data Cover tidak ditemukan"));
    }

    // Hapus file gambar
    if (cover.imageCover) {
      const imageCoverPath = path.join(__dirname, "../public", cover.imageCover);
      fs.unlinkSync(imageCoverPath);
    }

    const deletedCover = await Cover.findByIdAndDelete(id);

    res.json({ message: "Data Cover berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// Mengambil data Cover berdasarkan ID
export const getCoverById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cover = await Cover.findById(id);

    if (!cover) {
      return next(createError(404, "Data Cover tidak ditemukan"));
    }

    res.status(200).json(cover);
  } catch (error) {
    next(error);
  }
};
