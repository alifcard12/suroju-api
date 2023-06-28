import User from "../models/userModel.js";

// Menyimpan data pengguna dari autentikasi Google ke dalam database
export const saveGoogleUser = async (req, res, next) => {
  try {
    const { id, email, username, profilePict } = req.user;

    // Cek apakah pengguna dengan email yang sama sudah terdaftar
    let user = await User.findOne({ email });

    if (user) {
      // Pengguna sudah terdaftar, lakukan tindakan yang sesuai (misalnya, perbarui informasi pengguna)
      // ...
    } else {
      // Pengguna belum terdaftar, buat pengguna baru dan simpan ke dalam database
      user = new User({
        email,
        username,
        profilePict,
        // Jika Anda ingin menyimpan ID Google pengguna, tambahkan properti berikut:
        // googleId: id
      });

      await user.save();
    }

    // Lakukan pengaturan sesuai kebutuhan, seperti mengirimkan token JWT, mengatur cookie, atau mengarahkan pengguna ke halaman utama
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    next(error);
  }
};
