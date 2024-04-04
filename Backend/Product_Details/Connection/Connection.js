const { MongoClient } = require("mongodb");
require("dotenv").config();
const multer = require('multer');

const client = new MongoClient(process.env.PRODUCT_CLUSTER_URL);
async function dataConnect() {
    try {
      await client.connect();
      console.log("db connected");

      const database = client.db(process.env.PRODUCT_DB);
      const collection = database.collection(process.env.PRODUCT_COLLECTION);
      console.log("col")
    //   console.log(collection);
      return collection;
    }catch(error) {
           console.error("Error connecting to the database:", error);
            process.exit(1);}
    // } finally {
    //   await client.close();
    // }
  }
//   dataConnect().catch(error => {
//     console.error("Error connecting to the database:", error);
//     process.exit(1); // Exit the process if unable to connect to the database
//   });

  module.exports = dataConnect;

