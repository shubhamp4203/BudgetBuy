const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

function validateExpiry(value) {
  if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value) && !/^(0[1-9]|1[0-2])\/([0-9]{4})$/.test(value)) {
    return false;
  }

  const [month, year] = value.split('/');

  const expiryDate = new Date(parseInt(year.length === 2 ? '20' + year : year), month, 0);

  if (expiryDate < new Date()) {
    return false;
  }

  return true;
}

const addressSchema = new mongoose.Schema({
  pincode: {
    type: Number,
    required: [true, "Enter a pincode"],
    validate:[validator= function (v) {
      return /^[1-9]{1}[0-9]{2}[0-9]{3}$/.test(v.toString()); // Change "IN" to your country code if necessary
    },
    message= (props) => `${props.value} is not a valid pin code!`,
    ]
  },
  city: {
    type: String,
    required: [true, "Enter a city"],
  },
  state: {
    type: String,
    required: [true, "Enter a state"],
  },
  building_name: {
    type: String,
    required: [true, "Enter a building name"],
  },
  street: {
    type: String,
    required: [true, "Enter a street"],
  },
  landmark: {
    type: String,
  }
})

const carddetails = new mongoose.Schema({
  card_no: {
    type: String,
    required: [true, "Enter your Card Number"],
  },
  cardExpiryDate: {
    type: String,
    required: [true, "Enter your expiry date"],
  },
  cvv : {
    type: String,
    required: [true, "Enter a CVV"],
  },
})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  contact: {
    type: Number,
    required: [true, "please enter your number"],
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v.toString());
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    }
  },
  email: {
    type: String,
    required: [true, "please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "minimum length is 6"],
  },
  tags: {
    type:Array,
    // required:[true,"please select atleast one tag of interest"],
    minlength: 1
  },
  total_spent: {
    type: Number,
    default: 0,
  },
  total_orders: {
    type: Number,
    default: 0,
  },
  address: [addressSchema],
  // card_details: [carddetails]
});

//fire a function to hash the password before being saved
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//function that authenticates user while logging in
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("enter a registered email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
