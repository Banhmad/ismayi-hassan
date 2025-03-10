const express = require("express");
const passport = require("passport");
const {
  register,
  login,
  getMe,
  logout,
  googleCallback,
  facebookCallback,
} = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Register and login routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", logout);

// Google OAuth routes
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  googleCallback,
);

// Facebook OAuth routes
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false, failureRedirect: "/" }),
  facebookCallback,
);

module.exports = router;
