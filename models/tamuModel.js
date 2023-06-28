import mongoose from "mongoose";

const tamuSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    namaTamu: {
      type: String,
      required: true,
    },
    alamatTamu: {
      type: String,
      required: true,
    },
    namaSlug: {
      type: String,
      required: true,
      unique: true,
    },
    alamatSlug: {
      type: String,
      required: true,
      unique: true,
    },
    statusKirim: {
      type: String,
      enum: ["Terkirim", "Gagal", "Pending"],
      default: "Pending",
    },
    statusHadir: {
      type: String,
      enum: ["Hadir", "Tidak Hadir", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Tamu = mongoose.model("Tamu", tamuSchema);

export default Tamu;
