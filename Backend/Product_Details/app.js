const Routes = require("./Routes/Routes");
const express = require("express");
const app = express();
require("dotenv").config({path: '../.env'});
const dataConnect = require("./Connection/Connection")


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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dataConnect().catch(error => {
  console.error("Error connecting to the database:", error);
  process.exit(1); // Exit the process if unable to connect to the database
}); 

app.use(Routes);
console.log("Product Server is running");
app.listen(8004, process.env.PRODUCT.split("http://")[1].split(":")[0]);
