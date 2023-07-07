import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["Admin", "Free", "Bronze", "Diamond", "Premium"],
      default: "free",
    },
    profilePict: {
      type: String,
      default: "/avatar.png",
    },
  },
  { timestamps: true }
);

// Middleware hook pre-save untuk memberikan nilai acak jika googleId tidak diberikan
userSchema.pre("save", function (next) {
  if (!this.googleId) {
    this.googleId = uuidv4();
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
