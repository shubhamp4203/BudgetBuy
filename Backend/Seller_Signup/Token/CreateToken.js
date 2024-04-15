const jwt = require("jsonwebtoken");
require("dotenv").config({path: '../.env'});

const tokencookies = (id, email, name) => {
  const maxAge = 3 * 24 * 60 * 60; // 3 days
  const token = jwt.sign({ id, email, name }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
  return token;
};

module.exports = tokencookies;
