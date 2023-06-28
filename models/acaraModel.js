import mongoose from "mongoose";

const acaraSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    namaAcara: {
      type: String,
      required: true,
    },
    tglAcara: {
      type: Date,
      required: true,
    },
    waktuMulai: {
      type: String,
      required: true,
    },
    waktuSelesai: {
      type: String,
      required: true,
    },
    zonaWaktu: {
      type: String,
      required: true,
    },
    tempatAcara: {
      type: String,
      required: true,
    },
    alamatAcara: {
      type: String,
      required: true,
    },
    maps: {
      type: String,
      required: true,
    },
    countdown: {
      type: String,
      enum: ["N", "Y"],
      default: "N",
    },
  },
  { timestamps: true }
);

const Acara = mongoose.model("Acara", acaraSchema);

export default Acara;
