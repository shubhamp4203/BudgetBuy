const Seller = require("../../Seller_Signup/Models/Seller_Model");
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
  if (err.code) {
    errors.email = "the phone number or email is already registered";
    console.log(err.code);
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
    const user = await User.create({
      name,
      contact,
      email,
      password,
      address,
      pincode,
      tags,
    });
    const user_id = user._id;
    const useremail = user.email;
    const resp = await axios.post(
      "https://9c3e-202-129-240-131.ngrok-free.app/createCart/",
      { user_id, useremail }
    );
    if (resp.status == 201) {
      res.status(201).json({ user: user._id });
    } else {
      console.log(resp);
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
    redirect_uri: "http://localhost:8003/auth/google/callback",
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
        res.redirect("http://localhost:3000/");
      } else {
        res.redirect("http://localhost:3000/signin");
      }
    }
    // use token_info as needed
  } catch (error) {
    console.error(error);
    // handle error
  }
};

//api for logging in
  module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
      const maxAge = 3 * 24 * 60 * 60;
      const user = await User.login(email, passwo0rd);
      const token=tokencookies(user._id, user.email, user.name);
      const cookie=res.cookie("jwt", token, { maxAge: maxAge * 1000, sameSite:None ,httpOnly:true});
      console.log(token);
      res.status(201).json({ user: user});
    } catch (err) {
      res.status(400).json({});
    }
  };

module.exports.updateUser_put=async (req,res)=>{
  const user_id=req.authdata.id;
  const user=User.findOne({_id:user_id});
  if(!user){
    return res.status(400).json({
      message: "User not found",
    });
  }
  const newuser = await User.updateOne(
    { _id: user_id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        pincode: req.body.pincode,
      },
    }
  );
  res.status(201).json({ newuser: newuser });
};

//api for logging out
module.exports.logout_post = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.forget_password= (req,res)=>{
  console.log()
}