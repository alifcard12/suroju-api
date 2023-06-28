import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// Konfigurasi Passport Google OAuth 2.0 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // Ganti URL callback sesuai dengan kebutuhan Anda
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Cek apakah pengguna dengan Google ID yang sama sudah terdaftar
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Jika pengguna belum terdaftar, buat pengguna baru
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            role: "free", // Atur peran pengguna sesuai kebutuhan
            profilePict: profile.photos[0].value,
          });

          // Simpan pengguna ke basis data
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
