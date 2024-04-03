const mongoose = require("mongoose");
const authRoutes = require("./routes//authRoute");
const OauthRoutes = require("./routes/OauthRoutes");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const passport = require("passport");
const cors = require('cors');

const googleStrategy = require("./googleOauth/googleStrategy");

//loading and using middlewares
app.use(cors({
    origin:'https://c686-202-129-240-131.ngrok-free.app',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

//connection to data base
const connection = mongoose.connect(process.env.USER_DB_URL);

app.use(authRoutes);
app.use("/auth", OauthRoutes);
app.listen(process.env.PORT);
// app.listen(8003,"10.20.30.89")