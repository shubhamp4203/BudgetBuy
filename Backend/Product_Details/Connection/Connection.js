const { MongoClient } = require("mongodb");
require("dotenv").config({path: '../.env'});

let client;
let collection;

async function dataConnect() {
    try {
      if(!client) {
        client = new MongoClient("mongodb+srv://rohanadatia11:T66T3lArmdijdmTM@budgetbuy.gcvjmm9.mongodb.net/");
        await client.connect();
        collection = client.db(process.env.PRODUCT_DB).collection(process.env.PRODUCT_COLLECTION);
      }
      return collection;
    }catch(error) {
           console.error("Error connecting to the database:", error);
            process.exit(1);}
  }

  module.exports = dataConnect;

