const mongoose = require("mongoose");
const authRoutes = require("./routes/authroute");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

//loading and using middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());

//connection to data base
const connection = mongoose.connect(process.env.USER_DB_URL);

app.use(authRoutes);
app.use("/auth", authRoutes);
app.listen(process.env.PORT);
// app.listen(8003,"10.20.30.89")
