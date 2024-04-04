// const Seller = require("../../Seller_Signup/Models/Seller_Model");
const User = require("../models/User");
require("dotenv").config();
const tokencookies = require("../Token/CreateToken");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
async function validateGoogleToken(access_token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: access_token,
      audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.log("Token validation failed:", error);
    return null;
  }
}

//This function handles all the error that could possibly be there while registering
const errorHandle = (err) => {
  let errors = {
    name: "",
    contact: "",
    email: "",
    password: "",
    address: "",
    pincode: "",
    tags: "",
  };

  //this thing is only for the fields that need unique values
  if (err.code === 11000) {
    errors.email = "the phone number or email is already registered";
    return errors;
  }

  //all other error handle
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//api for registering a new custommer
module.exports.signup_post = async (req, res) => {
  const { name, contact, email, password, address, pincode, tags } = req.body;
  try {
    console.log(email);
    const user = await User.create({
      name,
      contact,
      email,
      password,
      address,
      pincode,
      tags,
    });
    console.log("error");
    const user_id = user._id;
    const useremail = user.email;
    const resp = await axios.post(process.env.ORDER + "/createCart/", {
      user_id,
      useremail,
    });
    if (resp.status == 201) {
      res.status(201).json({ user: user._id });
    } else {
      console.log(resp.message);
      res.status(400).json({ error: resp });
    }
  } catch (err) {
    const errors = errorHandle(err);
    console.log(err);
    res.status(400).json({ errors });
  }
};

module.exports.callback = async (req, res) => {
  const code = req.query.code;
  const url = "https://oauth2.googleapis.com/token";
  const data = {
    redirect_uri: process.env.AUTHENTICATION + "/auth/google/callback",
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "authorization_code",
  };
  const headers = { "Content-Type": "application/json" };

  try {
    const response = await axios.post(url, data, { headers: headers });
    const token_info = response.data;
    const id_token = await validateGoogleToken(token_info.id_token);
    console.log(id_token);
    if (id_token) {
      const user = await User.findOne({ email: id_token.email });
      console.log(user);
      if (user) {
        const token = tokencookies(user._id, user.email, user.name);
        console.log(token);
        console.log(req.hostname);
        res
          .cookie("jwt", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            // sameSite: "None",
            // secure: true,
            // path: "/",
            // domain: ".ngrok-free.app",
          })
          .status(201)
          .redirect(process.env.FRONTEND + "/");
      } else {
        res.redirect(process.env.FRONTEND + "/signup");
      }
    }
    // use token_info as needed
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Error in google login" });
  }
};

//api for logging in
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = tokencookies(user._id, user.email, user.name);
    console.log("Setting cookie");
    console.log(req.hostname);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      // sameSite: "None",
      // secure: true,
      // path: "/",
      // domain: ".ngrok-free.app",
    });
    res.status(200);
    res.json({ message: "Login Successfull" });
    // console.log(token);
  } catch (err) {
    res.status(400).json({ message: "Login failed", error: err });
  }
};

// function generateAuthUrl(clientId, redirectUri, scope) {
//   let authUrl = "https://accounts.google.com/o/oauth2/v2/auth";
//   authUrl += "?client_id=" + encodeURIComponent(clientId);
//   authUrl += "&redirect_uri=" + encodeURIComponent(redirectUri);
//   authUrl += "&response_type=code";
//   authUrl += "&scope=" + encodeURIComponent(scope);
//   authUrl += "&access_type=offline";
//   return authUrl;
// }

// module.exports.

module.exports.updateUser_put = async (req, res) => {
  const user_id = req.authdata.id;
  try {
    const user = User.findOne({ _id: user_id });
    if (!user) {
      res.status(400).json({
        message: "User not found",
      });
    } else {
      const newuser = await User.updateOne(
        { _id: user_id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            pincode: req.body.pincode,
            contact: req.body.contact,
          },
        }
      );
      res
        .status(201)
        .json({ message: "user updated successsfully", newuser: newuser });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "User not found" }, err);
  }
};

//api for logging out
module.exports.logout_post = async (req, res) => {
  try {
    res
      .clearCookie("jwt", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "None",
        secure: true,
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch {
    res.status(400).json({ message: "Error in logging out" });
  }
};

module.exports.forget_password = (req, res) => {
  console.log();
};

module.exports.forgotPassword_post = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(200).json({ message: "Email found" });
    } else {
      res.status(400).json({ message: "Email not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Email not found" });
  }
};
