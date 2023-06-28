import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isiQuote: {
      type: String,
      required: true,
    },
    sumberQuote: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;
