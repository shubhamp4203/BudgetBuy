const UserLocation = require("../models/userLocation");
require("dotenv").config({ path: "../.env" });
const axios = require("axios");

module.exports.geofence = async (req, res) => {
  const { seller_id, products, regiondata } = req.body;
  console.log(seller_id, products, regiondata);
  res.status(200).json({ success: true, message: "OK" });
};

module.exports.addUserLocation = async (req, res) => {
  const { userid, lng, lat } = req.body;
  const userexist = await UserLocation.findOne({ user_id: userid });
  if (userexist) {
    userexist.location = {
      type: "Point",
      coordinates: [lng, lat],
    };
    await userexist.save();
    res.status(200).json({ success: true, message: "OK" });
  } else {
    const userLocation = await UserLocation.create({
      user_id: userid,
      location: {
        type: "Point",
        coordinates: [lng, lat],
      },
    });
    res.status(200).json({ success: true, message: "OK" });
  }
};
