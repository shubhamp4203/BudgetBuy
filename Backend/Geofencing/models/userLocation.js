const mongoose = require("mongoose")

const userLocationSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],  
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

userLocationSchema.index({location: '2dsphere'})

module.exports = mongoose.model('UserLocation', userLocationSchema)