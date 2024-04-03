const express = require("express");
const router = express.Router();
const User = require("../schema/users");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../config/passportAuth");

//
//
// User registration!
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (username && password && email) {
    try {
      const oldUser = await User.findOne({ username, email });

      if (oldUser) {
        return res.status(400).json({ msg: "User Already Exists!" });
      } else {
        if (username === "admin" && email === "admin@gmail.com") {
          bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
              console.log(err);
              return res.status(200).json("Registration Error! try again!");
            }
            await User.create({ ...req.body, password: hash, isAdmin: true });
            return res.status(200).json({ msg: "Registration Successful!" });
          });
        } else {
          bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
              console.log(err);
              return res.status(200).json("Registration Error! try again!");
            }
            await User.create({ ...req.body, password: hash });
            return res.status(200).json({ msg: "Registration Successful!" });
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Registration Error!" });
    }
  } else {
    return res.status(200).json({ msg: "Fill All Fields" });
  }
});

//
//
// User Login! using passport-local
// router.post("/login", (req, res, next) => {
//   console.log("Active");
//   passport.authenticate("local", {
//     failureRedirect: "/login/failed",
//     successRedirect: "/login/success",
//   })(req, res, next);
// });
// router.post(
//   "/login",
//   passport.authenticate("local", { failureRedirect: "/login/failed" }),
//   function (req, res) {
//     res.redirect("/login/success");
//   },
// );
router.post("/login", (req, res, next) => {
  passport.authenticate("local")(req, res, function () {
    if (!req.user) {
      console.log("User not found!");
    } else {
      req.session.save(() => {
        res.redirect("/login/success");
        console.log("signed in");
      });
    }
  });
});

//
//
// User Sign in! using passport-google-oauth20
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/nile",
  passport.authenticate("google", { failureRedirect: "/login/failure" }),
  (req, res) => {
    return res.redirect("/google-login/success");
  },
);

//
//
// User Logout!
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      return res.status(200).json({ msg: "try again!" });
    } else {
      return res.status(200).json({ msg: `Logged out!`, route: `/login` });
    }
  });
});

module.exports = router;
