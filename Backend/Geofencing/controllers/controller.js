const UserLocation = require("../models/userLocation");
const AdvertiseData = require("../models/advertiseData");
require("dotenv").config({ path: "../.env" });
const axios = require("axios");

function isPointInCircle(center, radius, point) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const lat1 = toRadians(center[0]);
  const lon1 = toRadians(center[1]);
  const lat2 = toRadians(point[1]);
  const lon2 = toRadians(point[0]);

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const R = 6371;

  const distance = R * c;

  return distance <= radius;
}

module.exports.geofence = async (req, res) => {
  const { seller, products, regiondata } = req.body;
  const interestedUsers = [];
  const users = await UserLocation.find();
  console.log("called");
  for(let i=0; i<users.length; i++){
    if(isPointInCircle([regiondata.latitude, regiondata.longitude], regiondata.radius, users[i].location.coordinates)){
      interestedUsers.push(users[i].user_id);
    }
  }
  const advertiseData = await AdvertiseData.create({
    sellerData: seller,
    products,
    regiondata,
    interestedUsers,
  });
  console.log(interestedUsers);
  res.status(200).json({ success: true, message: "OK", advertiseData });
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

module.exports.getNearbyProducts = async (req, res) => {
  const {user_id} = req.body;
  const nearbyProd = await AdvertiseData.find( {interestedUsers: { $in: [user_id]}});
  const products = [];
  for (let i=0; i<nearbyProd.length; i++){
    products.push(...nearbyProd[i].products);
  }
  res.status(200).json({success: true, message: "OK", products});
}