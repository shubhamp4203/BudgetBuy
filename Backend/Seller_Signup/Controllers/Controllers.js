const Seller = require("../Models/Seller_Model");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const tokencookies = require("../Token/CreateToken");
const axios = require("axios");
const FormData = require("form-data");
const { ObjectId } = require("mongodb");

//This  function handles all the error that could possibly be there while registering
const errorHandle = (err) => {
  let errors = {
    name: "",
    phone_number: "",
    email: "",
    password: "",
    aadhar_card: "",
    GSTnumber: "",
  };
  if (err.code) {
    errors.email = "the phone number or email is already registered";
    return errors;
  }
  if (err.message.includes("Seller validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports.seller_signup_post = async (req, res) => {
  const {
    name,
    phone_number,
    email,
    password,
    aadhar_card,
    GSTnumber,
    categories,
    address,
    bank_details,
  } = req.body;
  try {
    const seller = await Seller.create({
      name,
      phone_number,
      email,
      password,
      address,
      aadhar_card,
      GSTnumber,
      Categories: categories,
      bank_details,
    });
    res.status(201).json({ seller: seller._id });
  } catch (err) {
    console.log(err);
    const errors = errorHandle(err);
    res.status(400).json({ errors });
  }
};

module.exports.seller_login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const seller = await Seller.login(email, password);
    const token = tokencookies(seller._id, seller.email, seller.name);
    res.cookie("sellerjwt", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      // sameSite: "None",
      // secure: true,
      // path: "/",
      // domain: ".ngrok-free.app",
    });
    res.status(201).json({ message: "Seller Logged in successfully" });
  } catch (err) {
    console.log(err);
    res.clearCookie("userjwt");
    res.status(400).json({ message: "Login failed", error: err });
  }
};

module.exports.updateSeller_put = async (req, res) => {
  const seller_id = req.authdata.id;
  const seller = Seller.findOne({ _id: seller_id });
  if (!seller) {
    return res.status(400).json({
      message: "Incorrect code",
    });
  }
  const newseller = await Seller.updateOne(
    { _id: seller_id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        pincode: req.body.pincode,
        aadhar_card: req.body.aadhar_card,
        GSTnumber: req.body.GSTnumber,
        IFSC: req.body.IFSC,
        accountNumber: req.body.accountNumber,
        bankName: req.body.bankName,
        Catergories: req.body.Catergories,
        phone_number: req.body.phone_number,
      },
    }
  );
  res.status(201).json({ newseller: newseller });
};

module.exports.seller_logout_post = async (req, res) => {
  try {
    res
      .clearCookie("sellerjwt", {
        httpOnly: true,
        maxAge: 0,
        // sameSite: "None",
        // secure: true,
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch {
    res.status(400).json({ message: "Error in logging out" });
  }
};

module.exports.forgotPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await Seller.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      const uid = uuidv4();
      const payload = { userId: user._id };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      const resetlink =
        process.env.FRONTEND + "/seller/reset-password/" + uid + "/" + token;
      const resp = await axios.post(process.env.EMAIL + "/resetlink/", {
        resetlink,
        email,
      });
      if (resp.status == 200) {
        console.log("OK");
        res.status(200).json({ message: "Reset link sent to your email" });
      } else {
        res.status(401).json({ message: "Something went wrong" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(402).json({ message: "Something went wrong" });
  }
};

module.exports.resetPassword = async (req, res) => {
  const newpass = req.body.newpassword;
  const token = req.body.token;
  try {
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Seller.findOne({ _id: payload.userId });
    if (!user) {
      res.status(400).json({ message: "Invalid token" });
    }
    user.password = newpass;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports.addProduct = async (req, res) => {
  const seller_id = req.authdata.id;
  const formData = new FormData();
  formData.append("image", req.file.buffer, req.file.originalname);
  for (let key in req.body) {
    formData.append(key, req.body[key]);
  }
  formData.append("seller_id", seller_id);

  try {
    const resp = await axios.post(
      process.env.PRODUCT + "/insertProduct",
      formData,
      {
        headers: formData.getHeaders(),
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      }
    );

    if (resp.status == 201) {
      res.status(201).json({ message: "Product inserted" });
    } else if (resp.status == 401) {
      res.status(401).json({ message: "SKU ID is already in use" });
    }
  } catch (err) {
    res.status(500).json({ message: "Product not inserted" });
  }
};

module.exports.getSellerData = async (req, res) => {
  try {
    console.log("called");
    const seller_id = req.body.seller_id;
    const seller = await Seller.findOne({ _id: new ObjectId(seller_id) });
    console.log(seller);
    res.status(200).json({ seller });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports.getSellerProduct = async (req, res) => {
  const seller_id = req.authdata.id;
  try {
    const resp = await axios.post(process.env.PRODUCT + "/getSellerProduct", {
      seller_id,
    });
    res.status(200).json({ result: resp.data.result });
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports.chatgroup_get = async (req, res) => {
  const user_id = req.authdata.id;

  try {
    const resp = await axios.get(process.env.CHAT + "/chatgroups/grouplist", {
      params: {
        user_id,
      },
    });
    if (resp.status == 200) {
      console.log("resp.data:", resp.data);
      res.status(200).json({ chatGroup: resp.data, userId: user_id });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

module.exports.authenticate = async (req, res) => {
  res.status(200).json({ message: "Authenticated" });
};
module.exports.getSellerOrder = async (req, res) => {
  const seller_id = req.authdata.id;
  const status = req.body.type;
  try {
    const resp = await axios.get(process.env.ORDER + "/getSellerOrder/", {
      params: {
        seller_id,
        status,
      },
    });
    if (resp.status == 200) {
      res.status(200).json({ result: resp.data });
    } else if (resp.status == 204) {
      res.status(204).json({ message: "No orders found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.advertise = async (req, res) => {
  const seller_id = req.authdata.id;
  const { products, regiondata } = req.body;
  try {
    const seller = await Seller.findOne({_id: new ObjectId(seller_id)});
    const resp = await axios.post(process.env.GEOFENCING + "/geofence", {
      seller,
      products,
      regiondata,
    });
    if (resp.status == 200) {
      const advertiseData = await resp.data.advertiseData;
      res.status(200).json({ message: "Advertise created", advertiseData });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
