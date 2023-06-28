import Gallery from "../models/galleryModel.js";
import createError from "../utils/createError.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mendapatkan semua data Galeri
export const getGallery = async (req, res, next) => {
  try {
    const userId = req.userId;

    const gallery = await Gallery.find({ userId });

    res.status(200).json(gallery);
  } catch (error) {
    next(error);
  }
};

// Menambahkan data Galeri
export const addGallery = async (req, res, next) => {
  try {
    const userId = req.userId;
    const imageFiles = req.files && req.files["imageUrl"];

    const savedImages = [];

    if (imageFiles && imageFiles.length > 0) {
      for (let i = 0; i < imageFiles.length; i++) {
        const imageUrl = "/gallery/" + imageFiles[i].filename;

        const gallery = new Gallery({
          userId,
          imageUrl,
        });

        const savedGallery = await gallery.save();
        savedGallery.imageUrl = req.protocol + "://" + req.get("host") + imageUrl;
        savedImages.push(savedGallery);
      }
    }

    res.status(201).json(savedImages);
  } catch (error) {
    next(error);
  }
};

// Mengedit data Galeri berdasarkan ID
export const editGallery = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return next(createError(404, "Data Galeri tidak ditemukan"));
    }

    gallery.imageUrl = imageUrl;

    const updatedGallery = await gallery.save();

    res.json(updatedGallery);
  } catch (error) {
    next(error);
  }
};

// Menghapus data Galeri berdasarkan ID
export const deleteGallery = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return next(createError(404, "Data Galeri tidak ditemukan"));
    }

    // Hapus file gambar
    if (gallery.imageUrl) {
      const imageUrlPath = path.join(__dirname, "../public", gallery.imageUrl);
      fs.unlinkSync(imageUrlPath);
    }

    const deletedGallery = await Gallery.findByIdAndDelete(id);

    res.json({ message: "Data Galeri berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// Mengambil data Galeri berdasarkan ID
export const getGalleryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findById(id);

    if (!gallery) {
      return next(createError(404, "Data Galeri tidak ditemukan"));
    }

    res.status(200).json(gallery);
  } catch (error) {
    next(error);
  }
};

// Mengambil data Galeri berdasarkan userId
export const getGalleryByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const gallery = await Gallery.find({ userId });

    res.status(200).json(gallery);
  } catch (error) {
    next(error);
  }
};
