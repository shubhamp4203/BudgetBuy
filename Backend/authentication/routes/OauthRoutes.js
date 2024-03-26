// routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authControllers");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  })
);

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logged out successfully" });
    res.redirect("/");
  });
});

module.exports = router;
