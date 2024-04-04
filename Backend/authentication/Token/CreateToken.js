const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokencookies = (id, email, name) => {
  const maxAge = 3 * 24 * 60 * 60; // 3 days
  const token = jwt.sign({ id, email, name }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
  return token;
};
console.log("Token and cookies:", tokencookies);

module.exports = tokencookies;
