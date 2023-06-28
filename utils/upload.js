import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../FE/Public/uploads/"));
  },
  filename: function (req, file, cb) {
    // Logika untuk menentukan nama file
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

export default upload;
