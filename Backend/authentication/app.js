const mongoose = require("mongoose");
const authRoutes=require("./routes/authroute");
const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(process.env.CLUSTER_URL)

// app.get('/set-cookies',(req,res)=>{ 
//     res.cookie('newUser',false);
//     res.cookie('isEmployee',true,{maxAge:2*1000,secure:true})
//     res.send("you got cookie");
// })

// app.get('/read-cookie',(req,res)=>{
//     const cookies=req.cookies;
//     console.log(cookies);
//     res.json(cookies)
// })

app.use(authRoutes);
app.listen(5000);