const { MongoClient, Long } = require("mongodb");
require("dotenv").config({ path: "../.env" });

let client;
let collection;

async function dataConnect() {
  try {
    if (!client) {
      client = new MongoClient(process.env.PRODUCT_CLUSTER_URL);
      await client.connect();
      collection = client
        .db(process.env.PRODUCT_DB)
        .collection(process.env.PRODUCT_COLLECTION);
    }
    console.log("Connected to the database");
    return collection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
}

module.exports = dataConnect;
