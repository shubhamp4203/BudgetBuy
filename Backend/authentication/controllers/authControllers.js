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
    const resp = await axios.post(
      "https://f4d5-202-129-240-131.ngrok-free.app/createCart/",
      {
        user_id,
        useremail,
      }
    );
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
    redirect_uri:
      "https://e1e4-202-129-240-131.ngrok-free.app/auth/google/callback",
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
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "None",
            secure: true,
            path: "/",
            domain: "https://15cf-202-129-240-131.ngrok-free.app/",
          }).status(201).json({ message: "Login Successfull", user: user });
          // res.redirect("https://15cf-202-129-240-131.ngrok-free.app/");
      } else {
        res.redirect("https://15cf-202-129-240-131.ngrok-free.app/signup");
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
    const cookie = res
      .cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite: "None",
        secure: true,
      })
      .status(201)
      .json({ message: "Login Successfull", user: user });
    // console.log(token);
  } catch (err) {
    res.status(400).json({ message: "Login failed", error: err });
  }
};

module.exports.updateUser_put = async (req, res) => {
  const user_id = req.authdata.id;
  try {
    const user = User.findOne({ _id: user_id });
    if (!user) {
      res.status(400).json({
        message: "User not found",
      });
      // res.redirect("https://cb0a-202-129-240-131.ngrok-free.app/signin");
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
