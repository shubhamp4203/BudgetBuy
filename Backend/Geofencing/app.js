const mongoose = require("mongoose");
const express = require("express");
const Routes = require("./routes/route");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "../.env" });
const cors = require("cors");

// app.use(cors({
//   origin: process.env.FRONTEND,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

app.use((req, res, next) => {
  // Set Access-Control-Allow-Origin header to allow requests from any origin
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND);
  // Set other CORS headers if needed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.options("*", (req, res) => {
  // Pre-flight request. Reply successfully:
  res.status(200).send();
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
