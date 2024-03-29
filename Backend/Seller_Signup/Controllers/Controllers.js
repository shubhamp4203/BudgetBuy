const Seller = require("../Models/Seller_Model");
const JWT = require("jsonwebtoken");
require("dotenv").config()

//This  function handles all the error that could possibly be there while registering
const errorHandle = (err) => {
  let errors = { name:"",phone_number:"",email:"", password:"",address:"",pin_code:"",aadhar_card:"",GSTnumber:"",IFSC:"",accountNumber:"",bankName:"",Catergories:""};
  // console.log(err)
  //this thing is only for the fields that need unique values
  if (err.code) {
    errors.email = "the phone number or email is already registered";
    // console.log(err.code);
    return errors;
  }
  if (err.message.includes("Seller validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const maxAge = 3 * 60 * 60 * 24;

//creating a JWT token
const CreateToken = (id, email,name) => {
  return JWT.sign({ id, email, name},process.env.SECRET_KEY ,{
    expiresIn: maxAge,
  }); 
};

module.exports.seller_signup_post=async (req,res)=>{
  const { name,phone_number,email, password,address,pin_code,aadhar_card,GSTnumber,IFSC,accountNumber,bankName,Catergories} = req.body;
  try {
    const seller = await Seller.create({ name,phone_number,email, password,address,pin_code,aadhar_card,GSTnumber,IFSC,accountNumber,bankName,Catergories });
    res.status(201).json({seller:seller._id});
    console.log(seller._id);
    console.log("seller signup post");
  } catch (err) {
      const errors = errorHandle(err);
      res.status(400).json({ errors });
  }
}

module.exports.seller_login_post = async (req, res) => {
  console.log("login post");
  const {email ,password}=req.body;
  try{
    const seller =await Seller.login(email,password)
    const token=await CreateToken(seller._id,seller.email,seller.password);
    res.cookie('jwt_seller',token,{httpOnly:true,maxAge:maxAge*1000})
    res.status(201).json({seller:seller._id});
    console.log('login success');
  }
  catch(err){
    console.log(err);
    res.status(400).json({});
  }
};

module.exports.updateSeller_put=async (req,res)=>{
  const seller_id=req.query.seller_id;
  const Seller=User.findOne({_id:seller_id});
  if(!seller){
    return res.status(400).json({
      message: "Incorrect code",
    });
  }
  const newseller=await Seller.updateOne(
    {_id:seller_id},{
      $set:{
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        pincode:req.body.pincode,
        aadhar_card:req.body.aadhar_card,
        GSTnumber:req.body.GSTnumber,
        IFSC:req.body.IFSC,
        accountNumber:req.body.accountNumber,
        bankName:req.body.bankName,
        Catergories:req.body.Catergories
      }
    }
  )
  res.status(201).json({newseller:newseller})
}

module.exports.seller_logout_post= async (req, res)=>{
  res.clearCookie('jwt_seller');
  res.status(200).json({message:'Seller Logged out successfully'});
}