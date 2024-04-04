const JWT = require("jsonwebtoken");
require("dotenv").config();

const cookieParser = require("cookie-parser");

const JWTverify = async (req, res, next) => {
  // Use cookie-parser to parse the cookies
  // console.log(req.headers.cookie);
  // req.cookies = cookieParser(req.headers.cookie);
  // console.log(req.cookies);
  const token = req.headers.cookie.split("=")[1];
  if (!token) {
    res.status(401).json({ message: "No token found" });
  } else {
    try {
      const decode = await JWT.verify(token, process.env.SECRET_KEY);
      console.log(decode);
      req.authdata = decode;
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
};
module.exports = JWTverify;
