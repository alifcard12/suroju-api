import mongoose from "mongoose";

const youtubeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    ytLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Youtube = mongoose.model("Youtube", youtubeSchema);

export default Youtube;
