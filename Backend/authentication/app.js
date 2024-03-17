const mongoose = require("mongoose");
const authRoutes=require("./routes/authroute");
const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
require('dotenv').config()

//loading and using middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//connection to data base
const connection=mongoose.connect(process.env.CLUSTER_URL)

app.use(authRoutes);
app.listen(process.env.PORT);