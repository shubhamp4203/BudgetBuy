const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");

app.use((req, res, next) => {
  // Set Access-Control-Allow-Origin header to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND);
  // Set other CORS headers if needed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});


app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connection to data base
const connection = mongoose.connect(process.env.USER_DB_URL);

app.use(authRoutes);
app.use("/auth", authRoutes);
console.log("User Server is running");
app.listen(8003, process.env.AUTHENTICATION.split("http://")[1].split(":")[0]);
