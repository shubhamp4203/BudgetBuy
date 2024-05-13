const JWT = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });
const cookie = require("cookie");

const JWTverifyOptional = async (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.userjwt;

  if (!token) {
    console.log("next");
    next();
  } else {
    try {
        console.log("decoode");
      const decode = JWT.verify(token, process.env.SECRET_KEY);
      req.homeauthdata = decode;
      console.log(req.homeauthdata);
      next();
    } catch (err) {
      res.status(400).json({ message: "Token not verified" });
    }
  }
};

module.exports = JWTverifyOptional;