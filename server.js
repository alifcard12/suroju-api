import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import passport from "./passport.js";
import session from "express-session";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authGoogleRoutes from "./routes/authGoogleRoutes.js";
import tamuRoutes from "./routes/tamuRoutes.js";
import mempelaiRoutes from "./routes/mempelaiRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import acaraRoutes from "./routes/acaraRoutes.js";
import quoteRoutes from "./routes/quoteRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import youtubeRoutes from "./routes/youtubeRoutes.js";
import coverRoutes from "./routes/coverRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

mongoose.set("strictQuery", true);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Terhubung ke MongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use(express.static(join(__dirname, "public")));
app.use(cors({ credentials: true, origin: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(cookieParser());

// Konfigurasi sesi
app.use(
  session({
    secret: "afhajkfui765787",
    resave: false,
    saveUninitialized: false,
  })
);
// Inisialisasi Passport
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authGoogleRoutes);
// Rute untuk mengarahkan pengguna ke halaman login Google
app.use("/api/users", userRoutes);
app.use("/api/", tamuRoutes);
app.use("/api/mempelai", mempelaiRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/acara", acaraRoutes);
app.use("/api/quote", quoteRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/youtube", youtubeRoutes);
app.use("/api/cover", coverRoutes);

// Jalankan server
app.listen(port, () => {
  connect();
  console.log(`Server berjalan di http://localhost:${port}`);
});
