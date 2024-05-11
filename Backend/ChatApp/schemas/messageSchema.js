const mongoose = require("mongoose");

const Message = mongoose.model("Message", {
  groupId: String,
  userId: String,
  text: String,
  createdAt: { type: Date, expires: "2s", default: Date.now },
});

module.exports = Message;
