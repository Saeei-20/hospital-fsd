const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  gender: { type: String, required: true }, 
  dob: { type: Date, required: true }, 
  username: { type: String, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  contactNumber: { type: Number, required: true } 
});

const signUpModel = mongoose.model("Signup", signUpSchema);
module.exports = signUpModel;
