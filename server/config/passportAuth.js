const passport = require("passport");
const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../schema/users");
const bcrypt = require("bcrypt");
require("dotenv").config();

//
//
// Local passport strategy configuration
// passport.use(
//   new LocalStrategy(async (username, password, cb) => {
//     const user =
//       (await User.findOne({ username })) ||
//       (await User.findOne({ email: username }));

//     if (!user) return cb(null, false);

//     bcrypt.compare(password, user.password, (err, isPwd) => {
//       if (err) return cb(null, false);
//       if (isPwd) return cb(null, user);
//       return cb(null, false);
//     });
//   }),
// );
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (error, user) {
      if (error) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, isPwd) => {
        if (err) return cb(null, false);
        if (isPwd) return cb(null, user);
        return cb(null, false);
      });
    });
  }),
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

//
//
// Google passport strategy configuration!
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://nile2-0.onrender.com/users/google/nile",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await User.findOne({ googleId: profile.id });
      if (user) return cb(null, user);
      else {
        const newUser = await User.create({
          googleId: profile.id,
          username: profile.displayName,
          isAdmin: false,
        });
        return cb(null, newUser);
      }
      return cb(null, false);
    },
  ),
);
passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, username);
});
