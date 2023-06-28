import Tamu from "../models/tamuModel.js";
import createError from "../utils/createError.js";

export const getTamu = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Mendapatkan data tamu dari basis data
    const tamu = await Tamu.find({ userId });

    res.status(200).json(tamu);
  } catch (error) {
    next(error);
  }
};

// Menambahkan tamu baru
export const addTamu = async (req, res, next) => {
  try {
    const { namaTamu, alamatTamu, namaSlug, alamatSlug } = req.body;

    // Mendapatkan ID pengguna yang terautentikasi
    const userId = req.userId;

    // Membuat objek tamu baru
    const tamu = new Tamu({
      userId,
      namaTamu,
      alamatTamu,
      namaSlug: namaSlug.toLowerCase(),
      alamatSlug: alamatSlug.toLowerCase(),
    });

    // Menyimpan tamu ke basis data
    const savedTamu = await tamu.save();

    res.status(201).json(savedTamu);
  } catch (error) {
    next(error);
  }
};

// Mengedit tamu berdasarkan ID
export const editTamu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { namaTamu, alamatTamu, namaSlug, alamatSlug } = req.body;

    // Mencari tamu berdasarkan ID
    const tamu = await Tamu.findById(id);

    if (!tamu) {
      return next(createError(404, "Tamu tidak ditemukan"));
    }

    // Mengupdate data tamu
    tamu.namaTamu = namaTamu;
    tamu.alamatTamu = alamatTamu;
    tamu.namaSlug = namaSlug.toLowerCase();
    tamu.alamatSlug = alamatSlug.toLowerCase();

    // Menyimpan perubahan ke database
    const updatedTamu = await tamu.save();

    res.json(updatedTamu);
  } catch (error) {
    next(error);
  }
};

// Menghapus tamu berdasarkan ID
export const deleteTamu = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Menghapus tamu berdasarkan ID
    const deletedTamu = await Tamu.findByIdAndDelete(id);

    if (!deletedTamu) {
      return next(createError(404, "Tamu tidak ditemukan"));
    }

    res.json({ message: "Tamu berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};
