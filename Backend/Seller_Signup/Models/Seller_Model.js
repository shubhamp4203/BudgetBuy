const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

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

const bankSchema = new mongoose.Schema({
  bankname: {
    type: String,
    required: [true, "Enter a bank name"],
  },
  acc_no: {
    type: String,
    required: [true, "Enter your account number"],
  },
  ifsc_code: {
    type: String,
    required: [true, "Enter your IFSC code"],
  },
  branch_name: {
    type: String,
    required: [true, "Enter your branch name"],
  }
})
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
  },
  Categories: {
    type: Array,
    minlength: 1
  },
  address: addressSchema,
  bank_details: bankSchema
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