import Youtube from "../models/youtubeModel.js";
import createError from "../utils/createError.js";

// Mengambil semua data Youtube
export const getYoutubeList = async (req, res, next) => {
  try {
    const youtubeList = await Youtube.find();
    res.status(200).json(youtubeList);
  } catch (error) {
    next(error);
  }
};

// Menambahkan data Youtube baru
export const addYoutube = async (req, res, next) => {
  try {
    const { ytLink } = req.body;

    const userId = req.userId;

    // Membuat objek Youtube baru
    const youtube = new Youtube({
      userId,
      ytLink,
    });

    // Menyimpan data Youtube ke basis data
    const savedYoutube = await youtube.save();

    res.status(201).json(savedYoutube);
  } catch (error) {
    next(error);
  }
};

// Mengedit data Youtube berdasarkan ID
export const editYoutube = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, ytLink } = req.body;

    // Mencari data Youtube berdasarkan ID
    const youtube = await Youtube.findById(id);

    if (!youtube) {
      return next(createError(404, "Data Youtube tidak ditemukan"));
    }

    // Mengupdate data Youtube
    youtube.userId = userId;
    youtube.ytLink = ytLink;

    // Menyimpan perubahan ke database
    const updatedYoutube = await youtube.save();

    res.json(updatedYoutube);
  } catch (error) {
    next(error);
  }
};

// Menghapus data Youtube berdasarkan ID
export const deleteYoutube = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Menghapus data Youtube berdasarkan ID
    const deletedYoutube = await Youtube.findByIdAndDelete(id);

    if (!deletedYoutube) {
      return next(createError(404, "Data Youtube tidak ditemukan"));
    }

    res.json({ message: "Data Youtube berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// Mendapatkan data Youtube berdasarkan ID pengguna
export const getYoutubeByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    // Mencari data Youtube berdasarkan ID pengguna
    const youtube = await Youtube.findOne({ userId });

    if (!youtube) {
      return next(createError(404, "Data Youtube tidak ditemukan"));
    }

    res.json(youtube);
  } catch (error) {
    next(error);
  }
};
