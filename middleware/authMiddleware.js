import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated"));

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid"));

    // Mendapatkan informasi pengguna dari payload token
    const { id, role } = payload;

    // Menyimpan informasi pengguna di objek request
    req.userId = id;
    req.userRole = role;

    next();
  });
};
