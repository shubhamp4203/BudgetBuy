const mongoose = require("mongoose");

const advertiseDataSchema = new mongoose.Schema({
    sellerData: {
        type: Object,
    },
    products: {
        type: Array,
    },
    regiondata: {
        type: Object,
    },
    interestedUsers: {
        type: Array,
    }
});

const AdvertiseData = mongoose.model("AdvertiseData", advertiseDataSchema);
module.exports = AdvertiseData;