const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating user schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model("users", userSchema);
