const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
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
});

//fire a function after a event has done
// userSchema.post("save", (doc, next) => {
//   console.log("new user was saved", doc);
//   next();
// });

//fire a function before some event
// userSchema.pre('save',function(next){
//     console.log("user about to be created",this);
//     next();
// })

//fire a function to hash the password before being saved
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

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
