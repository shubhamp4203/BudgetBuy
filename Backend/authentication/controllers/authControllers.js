const User = require("../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config()

const errorHandle = (err) => {
  let errors = { email: "", password: "" };

  //unique data error handel
  if (err.code) {
    errors.email = "the email is already registered";
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

const maxAge = 3 * 60 * 60 * 24;

const CreateToken = (id) => {
  return JWT.sign({ id },process.env.SECRET_KEY ,{
    expiresIn: maxAge,
  }); //this secret key is not not shared anywhere and it is kept quite long
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json({user:user._id});
    console.log(user._id);
  } catch (err) {
      const errors = errorHandle(err);
      res.status(400).json({ errors });
  }
  console.log("signup post");
};

module.exports.login_post = async (req, res) => {
  console.log("login post");
  const {email , password}=req.body;
  try{
    const user =await User.login(email,password)
    const token=await CreateToken(user._id);
    res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
    console.log(token);
    res.status(201).json({user:user._id});
    console.log('login success');
  }
  catch(err){
    console.log(err);
    res.status(400).json({});
  }
};
