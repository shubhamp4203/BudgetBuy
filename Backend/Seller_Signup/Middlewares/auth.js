const JWT = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const cookie = require("cookie");

const JWTverify = async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.sellerjwt;
  if (!token) {
    res.status(401).json({ message: "no token found" });
  } else {
    try {
      const decode = JWT.verify(token, process.env.SECRET_KEY);
      req.authdata = decode;
      next();
    } catch (err) {
      res.status(400).json({ message: "Token not verified" });
    }
  }
};
module.exports = JWTverify;
