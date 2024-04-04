const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokencookies = (res, id, email, name) => {
  const maxAge = 3 * 24 * 60 * 60; // 3 days
  const token = jwt.sign({ id, email, name }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });

  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  return token;
};

module.exports = tokencookies;
