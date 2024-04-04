const Routes = require("./Routes/Routes");
const express = require("express");
require("dotenv").config();
const dataConnect = require("./Connection/Connection")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dataConnect().catch(error => {
  console.error("Error connecting to the database:", error);
  process.exit(1); // Exit the process if unable to connect to the database
});

app.use(Routes);
app.listen(process.env.PORT);
