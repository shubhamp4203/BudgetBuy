const Seller = require("../../Seller_Signup/Models/Seller_Model");
const User = require("../models/User");
require("dotenv").config();
const tokencookies = require("../Token/CreateToken");
const axios=require("axios")

//This function handles all the error that could possibly be there while registering
const errorHandle = (err) => {
  let errors = {
    name: "",
    contact: "",
    useremail: "",
    password: "",
    address: "",
    pincode: "",
    tags: "",
  };

  //this thing is only for the fields that need unique values
  if (err.code) {
    errors.useremail = "the phone number or email is already registered";
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
  const {
    name,
    contact,
    useremail,
    password,
    address,
    pincode,
    tags,
  } = req.body;
  try {
    const user = await User.create({
      name,
      contact,
      useremail,
      password,
      address,
      pincode,
      tags,
    });
    const user_id=user._id;
    const email=user.useremail;
    const resp = await axios.post(process.env.CLEAR_CART,{user_id,email});
    if(resp.status==201) {
      console.log("cart created successfully");
      res.status(201).json({ user: user._id });
    }
    else {
      console.log(resp);
      res.status(400).json({ message: "cart creation failed" });
    }
  } catch (err) {
    const errors = errorHandle(err);
    console.log(err);
    res.status(400).json({ errors });
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
  const seller_id=req.authdata.id;
  const seller=User.findOne({_id:seller_id});
  if(!seller){
    return res.status(400).json({
      message: "Seller not found",
    });
  }
  const newseller=await Seller.updateOne(
    {_id:seller_id},{
      $set:{
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        pincode:req.body.pincode,
        tags:req.body.tags,
        contact:req.body.contact
      }
    }
  )
  console.log("updated seller",newseller)
  res.status(201).json({newseller:newseller})
}

//api for logging out
module.exports.logout_post = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports.forget_password= (req,res)=>{
  console.log()
}