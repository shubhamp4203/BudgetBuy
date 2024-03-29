const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

//Schema that is used to register or login a new customer
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
  address: {
    type: String,
    required: [true, "please enter an address"],
  },
  pincode: {
    type: Number,
    required: [true, "Enter a pincode"],
    validate:[validator= function (v) {
      return /^[1-9]{1}[0-9]{2}[0-9]{3}$/.test(v.toString()); // Change "IN" to your country code if necessary
    },
    message= (props) => `${props.value} is not a valid pin code!`,
    ]
},
  tags: {
    type:Array,
    required:[true,"please select atleast one tag of interest"],
    minlength: 1
  },
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
