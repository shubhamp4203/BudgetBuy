const mongoose = require("mongoose");
const Routes = require("./Routes/Routes");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(Routes);

//connection to data base
const connection=mongoose.connect(process.env.SELLER_DB_URL)

app.listen(process.env.PORT);
