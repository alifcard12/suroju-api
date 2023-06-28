import Acara from "../models/acaraModel.js";
import createError from "../utils/createError.js";

// Mengambil semua acara
export const getAcaraAll = async (req, res, next) => {
  try {
    const acara = await Acara.find();
    res.status(200).json(acara);
  } catch (error) {
    next(error);
  }
};

export const getAcara = async (req, res, next) => {
  try {
    const userId = req.userId;

    // Mendapatkan data tamu dari basis data
    const acara = await Acara.find({ userId });

    res.status(200).json(acara);
  } catch (error) {
    next(error);
  }
};

// Menambahkan acara baru
export const addAcara = async (req, res, next) => {
  try {
    const { namaAcara, tglAcara, waktuMulai, waktuSelesai, tempatAcara, alamatAcara, maps, countdown, zonaWaktu } = req.body;

    // Mendapatkan ID pengguna yang terautentikasi
    const userId = req.userId;

    // Membuat objek acara baru
    const acara = new Acara({
      userId,
      namaAcara,
      tglAcara,
      waktuMulai,
      waktuSelesai,
      tempatAcara,
      alamatAcara,
      maps,
      countdown,
      zonaWaktu,
    });

    // Menyimpan acara ke basis data
    const savedAcara = await acara.save();

    res.status(201).json(savedAcara);
  } catch (error) {
    next(error);
  }
};

// Mengedit acara berdasarkan ID
export const editAcara = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { namaAcara, tglAcara, waktuMulai, waktuSelesai, tempatAcara, alamatAcara, maps, countdown, zonaWaktu } = req.body;

    // Mencari acara berdasarkan ID
    const acara = await Acara.findById(id);

    if (!acara) {
      return next(createError(404, "Acara tidak ditemukan"));
    }

    // Mengupdate data acara
    acara.namaAcara = namaAcara;
    acara.tglAcara = tglAcara;
    acara.waktuMulai = waktuMulai;
    acara.waktuSelesai = waktuSelesai;
    acara.tempatAcara = tempatAcara;
    acara.alamatAcara = alamatAcara;
    acara.maps = maps;
    acara.countdown = countdown;
    acara.zonaWaktu = zonaWaktu;

    // Menyimpan perubahan ke database
    const updatedAcara = await acara.save();

    res.json(updatedAcara);
  } catch (error) {
    next(error);
  }
};

// Menghapus acara berdasarkan ID
export const deleteAcara = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Menghapus acara berdasarkan ID
    const deletedAcara = await Acara.findByIdAndDelete(id);

    if (!deletedAcara) {
      return next(createError(404, "Acara tidak ditemukan"));
    }

    res.json({ message: "Acara berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// Mengambil data Mempelai berdasarkan userId
export const getAcaraByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const acara = await Acara.find({ userId }); // Mengambil data Mempelai berdasarkan userId

    res.status(200).json(acara);
  } catch (error) {
    next(error);
  }
};
