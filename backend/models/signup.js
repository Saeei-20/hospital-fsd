const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema({
    name: String,
    gender: String,
    dob: Date,
    contactNumber: String,
    email: String,
    username: String,
    password: String,
    confirmPassword: {
      type: String,
      required: true
    }
  });
  

module.exports = mongoose.model("Signup", signUpSchema);
