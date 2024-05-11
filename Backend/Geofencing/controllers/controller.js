const UserLocation = require("../models/userLocation");
require("dotenv").config({ path: "../.env" });
const axios = require("axios");

module.exports.geofence = async (req, res) => {
  const { seller_id, products, regiondata } = req.body;
  console.log(seller_id, products, regiondata);
  res.status(200).json({ success: true, message: "OK" });
};
