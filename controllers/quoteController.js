import Quote from "../models/quoteModel.js";
import createError from "../utils/createError.js";

// Mengambil semua quote
export const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find();
    res.status(200).json(quotes);
  } catch (error) {
    next(error);
  }
};

// Menambahkan quote baru
export const addQuote = async (req, res, next) => {
  try {
    const { isiQuote, sumberQuote } = req.body;

    const userId = req.userId;

    // Membuat objek quote baru
    const quote = new Quote({
      userId,
      isiQuote,
      sumberQuote,
    });

    // Menyimpan quote ke basis data
    const savedQuote = await quote.save();

    res.status(201).json(savedQuote);
  } catch (error) {
    next(error);
  }
};

// Mengedit quote berdasarkan ID
export const editQuote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isiQuote, sumberQuote } = req.body;

    // Mencari quote berdasarkan ID
    const quote = await Quote.findById(id);

    if (!quote) {
      return next(createError(404, "Quote tidak ditemukan"));
    }

    // Mengupdate data quote
    quote.isiQuote = isiQuote;
    quote.sumberQuote = sumberQuote;

    // Menyimpan perubahan ke database
    const updatedQuote = await quote.save();

    res.json(updatedQuote);
  } catch (error) {
    next(error);
  }
};

// Menghapus quote berdasarkan ID
export const deleteQuote = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Menghapus quote berdasarkan ID
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return next(createError(404, "Quote tidak ditemukan"));
    }

    res.json({ message: "Quote berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};

// Mengambil data quote berdasarkan userId
export const getQuotesByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const quotes = await Quote.find({ userId }); // Mengambil data quote berdasarkan userId

    res.status(200).json(quotes);
  } catch (error) {
    next(error);
  }
};
