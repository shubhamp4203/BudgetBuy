// routes/authRoutes.js
const express = require("express");
const passport = require("passport");
const authController = require("../controllers/authControllers");
const tokencookies = require("../Token/CreateToken");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://c686-202-129-240-131.ngrok-free.app/signin",
  }),
  function(req, res) {
    console.log("HEY")
    const token = tokencookies(req.user._id, req.user.useremail, req.user.name);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.redirect("https://c686-202-129-240-131.ngrok-free.app/");
  },
  
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
