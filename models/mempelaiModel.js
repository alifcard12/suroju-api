import mongoose from "mongoose";

const mempelaiSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    mempelaiPria: {
      type: String,
      required: true,
    },
    namaPanggilanPria: {
      type: String,
      required: true,
    },
    ayahPria: {
      type: String,
      required: true,
    },
    ibuPria: {
      type: String,
      required: true,
    },
    mempelaiWanita: {
      type: String,
      required: true,
    },
    namaPanggilanWanita: {
      type: String,
      required: true,
    },
    ayahWanita: {
      type: String,
      required: true,
    },
    ibuWanita: {
      type: String,
      required: true,
    },
    posisiMempelai: {
      type: String,
    },
    fotoPria: {
      type: String,
    },
    fotoWanita: {
      type: String,
    },
  },
  { timestamps: true }
);

const Mempelai = mongoose.model("Mempelai", mempelaiSchema);

export default Mempelai;
