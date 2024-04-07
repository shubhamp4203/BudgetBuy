const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoute");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config({path: '../.env'});
const cors = require("cors");

console.log("Server is running");
// app.use(cors({
//     origin:"http://127.0.0.1:3000",
//     credentials:true,
// }))
app.use((req, res, next) => {
  // Set Access-Control-Allow-Origin header to allow requests from any origin
  res.setHeader(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND
  );
  // Set other CORS headers if needed
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
//loading and using middlewares
// app.use(cors({
//   origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       // In development, allow requests from any origin
//       if (process.env.NODE_ENV === 'development') {
//           return callback(null, true);
//       } else {
//           // In production, allow requests only from specific origins
//           const allowedOrigins = ['http://localhost:5173', 'http://10.20.30.240:3000'];
//           if (allowedOrigins.includes(origin)) {
//               return callback(null, true);
//           } else {
//               return callback(new Error('Not allowed by CORS'));
//           }
//       }
//   },
//   credentials: true
// }));

// app.options("*", cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(passport.initialize());

//connection to data base
const connection = mongoose.connect(process.env.USER_DB_URL);

app.use(authRoutes);
app.use("/auth", authRoutes);
app.listen(8003, process.env.AUTHENTICATION.split("http://")[1].split(":")[0]);
// app.listen(8003,"10.20.30.89")
