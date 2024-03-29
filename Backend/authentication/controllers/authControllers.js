const User = require("../models/User");
require("dotenv").config();
const tokencookies = require("../Token/CreateToken");
const axios=require("axios")

//This  function handles all the error that could possibly be there while registering
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
  const {
    name,
    contact,
    email,
    password,
    address,
    pincode,
    tags,
  } = req.body;
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
    res.status(201).json({ user: user });
    const user_id=user._id
    await axios.post('http://10.20.30.86:8000/createCart/',{user_id});
  } catch (err) {
    const errors = errorHandle(err);
    res.status(400).json({ errors });
  }
};

//api for logging in
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    tokencookies(res, user._id, user.email, user.name);
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json({});
  }
};

module.exports.updateUser_put=async (req,res)=>{
  const user_id=req.query.user_id;
  const user=User.findOne({_id:user_id});
  if(!user){
    return res.status(400).json({
      message: "User not found",
    });
  }
  const newuser=await User.updateOne(
    {_id:user_id},{
      $set:{
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        address:req.body.address,
        pincode:req.body.pincode
      }
    }
  )
  res.status(201).json({newuser:newuser})
}

//api for logging out
module.exports.logout_post = async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "Logged out successfully" });
};
