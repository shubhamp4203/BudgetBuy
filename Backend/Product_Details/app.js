const mongoose = require("mongoose");
const Routes = require("./Routes/Routes");
const express = require("express");

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connection to data base
const connection=mongoose.connect(process.env.PRODUCT_DETAIL_DB_URL)

// app.use(Routes);
app.listen(process.env.PORT);
