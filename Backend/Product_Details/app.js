// const { MongoClient } = require("mongodb");
const Routes = require("./Routes/Routes");
const express = require("express");
require("dotenv").config();
const dataConnect = require("./Connection/Connection")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connection to data base
// const client = new MongoClient(process.env.PRODUCT_CLUSTER_URL);

// async function dataConnect() {
//   try {
//     await client.connect();
//     const database = client.db(process.env.PRODUCT_DB);
//     const collection = database.collection(process.env.PRODUCT_COLLECTION);
    
//   } finally {
//     await client.close();
//   }
// }
dataConnect().catch(error => {
  console.error("Error connecting to the database:", error);
  process.exit(1); // Exit the process if unable to connect to the database
});

app.use(Routes);
app.listen(process.env.PORT);
