const mongoose = require('mongoose')
const express = require('express')
const Routes = require("./routes/route");
const app = express()
const cookieParser = require('cookie-parser')
require('dotenv').config({path: "../.env"})


app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();   
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));    
app.use(cookieParser());

//connection to data base
const connection = mongoose.connect(process.env.GEOFENCE_DB_URL);


app.use(Routes);
console.log("Geofencing Server is running");
app.listen(8006, process.env.GEOFENCING.split("http://")[1].split(":")[0]);
// app.listen(8006);

