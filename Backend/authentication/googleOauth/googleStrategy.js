const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const User = require("../models/User");
require("dotenv").config();
const tokencookies = require("../Token/CreateToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://84f2-202-129-240-131.ngrok-free.app/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value;
        const user = await User.findOne({ useremail: email });
        if (!user) {
          console.log("User not found");
          return done(null, false);
        } else {
          done(null, false);
        }
      } catch (err) { 
        return done(err);
      }
    }
  )
);
