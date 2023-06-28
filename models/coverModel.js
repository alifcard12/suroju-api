import mongoose from "mongoose";

const coverSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    judul: {
      type: String,
      required: true,
    },
    namaMempelai: {
      type: String,
      required: true,
    },
    imageCover: {
      type: String,
    },
  },
  { timestamps: true }
);

const Cover = mongoose.model("Cover", coverSchema);

export default Cover;
