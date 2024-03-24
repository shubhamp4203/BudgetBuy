const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const SellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter your name"]
  },
  phone_number: {
    type: Number,
    required: [true, "Please enter your number"],
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
    validate: [isEmail, "please enter a valid email"]
  },
  password: {
    type: String,
    required: [true, "please enter password"],
    minlength: [6, "minimum length is 6"]
  },
  address: {
    type: String,
    required: [true, "please enter an address"]
  },
  pin_code: {
    type: Number,
    required: [true, "Enter a pincode"],
    validate: [
      (validator = function (v) {
        return /^[1-9]{1}[0-9]{2}[0-9]{3}$/.test(v.toString());
      }),
      (message = (props) => `${props.value} is not a valid pin code!`),
    ]
  },
  aadhar_card: {
    type: Number,
    required: [true, "Enter your aadhar card number"],
    validate: {
      validator: function (v) {
        return /^\d{12}$/.test(v.toString());
      },
      message: (props) => `${props.value} is not a valid Aadhar card number!`,
    },
  },
  GSTnumber: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}\d[Z]{1}[A-Z\d]{1}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid GST number!`,
    }
  },
  IFSC: {
    type: String,
    required: [true, "enter your IFBC number"],
    validate: {
      validator: function (v) {
        return /^[A-Za-z]{4}\d{7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid IFSC code!`,
    }
  },
  accountNumber: {
    type: Number,
    required: [true, "Enter your bank number"],
    validate: {
      validator: function (v) {
        return /^\d{9,18}$/.test(v.toString());
      },
      message: (props) => `${props.value} is not a valid bank account number!`,
    }
  },
  bankName: {
    type: String,
    required: [true, "Enter your Bank name"],
  },
  Catergories: {
    type: String,
  }
});

SellerSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

SellerSchema.statics.login = async function (email, password) {
  const seller = await this.findOne({ email });
  if (seller) {
    const auth = await bcrypt.compare(password, seller.password);
    if (auth) {
      return seller;
    }
    throw Error("Incorrect password");
  }
  throw Error("enter a registered email");
};
const Seller = mongoose.model("Seller", SellerSchema);

module.exports = Seller;