import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    tema: {
      type: String,
      required: true,
    },
    paket: {
      type: String,
      enum: ["Free", "Bronze", "Diamond", "Premium"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Free", "Proses", "Lunas", "Expired"],
      default: "Free",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
