const mongoose = require("mongoose");
const moment = require("moment-timezone");

const userLocationSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  locTime: {
    type: String,
  },
});

userLocationSchema.pre("save", function (next) {
  this.locTime = moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
  next();
});

userLocationSchema.index({ location: "2dsphere" });

const UserLocation = mongoose.model("UserLocation", userLocationSchema);
module.exports = UserLocation;
