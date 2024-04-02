const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./routes/user");
const CommentRoute = require("./routes/comments");
const ProductRoute = require("./routes/products");
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const port = process.env.PORT || 5003;
start();

//
// Middleware
app.use(
  cors({
    origin: "https://nile-clothes.netlify.app",
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
  }),
);
app.use(
  session({
    secret: process.env.SECRET,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", UserRoute);
app.use("/comments", CommentRoute);
app.use("/products", ProductRoute);

//
//
// Local passport authentication redirect
app.get("/login/failed", (req, res) => {
  // Added this if statement to check the user is authenticated
  if (req.isAuthenticated()) {
    const { password, ...rest } = req.user;
    return res
      .status(200)
      .json({ msg: "Login Successful!", route: "/", user: { ...rest } });
  }

  // original code
  return res
    .status(400)
    .json({ msg: "Check entered details and try again!", route: "/login" });
});
app.get("/login/success", (req, res) => {
  if (req.isAuthenticated()) {
    const { password, ...rest } = req.user;
    return res
      .status(200)
      .json({ msg: "Login Successful!", route: "/", user: { ...rest } });
  }
  return res.status(200).json({
    msg: "Login Failed! try again!",
    route: "/login",
  });
});

//
//
// Google passport auth success redirect
app.get("/google-login/success", (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(`https://nile-clothes.netlify.app`);
  }
  return res.redirect(`https://nile-clothes.netlify.app/login`);
});

// Check auth status --- Maybe removed! Looks weird!
app.get("/check-auth-status", (req, res) => {
  if (req.isAuthenticated()) {
    const { password, ...rest } = req.user;
    return res.status(200).json({ isAuth: true, user: rest });
  }
  return res.status(403).json({ isAuth: false });
});

//
//
// Something I put to check comments
app.get("/comment", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({ msg: true });
  }
  return res.json({ msg: false });
});

//
//
// Start server
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI2);
    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (error) {
    console.log(error);
    return;
  }
}
