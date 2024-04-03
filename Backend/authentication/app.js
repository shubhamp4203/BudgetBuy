const mongoose = require("mongoose");
<<<<<<< HEAD
const authRoutes = require("./routes//authRoute");
const OauthRoutes = require("./routes/OauthRoutes");
=======
const authRoutes = require("./routes/authroute");
>>>>>>> 43b4099125697b2fe78971ed3d108421777dedb0
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const passport = require("passport");
const cors = require("cors");

//loading and using middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(passport.initialize());

//connection to data base
const connection = mongoose.connect(process.env.USER_DB_URL);

app.use(authRoutes);
app.use("/auth", authRoutes);
app.listen(process.env.PORT);
// app.listen(8003,"10.20.30.89")
