const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  gender: { type: String, required: true }, // 'string' should be 'String'
  dob: { type: Date, required: true }, // 'date' should be 'Date'
  username: { type: String, unique: true }, // 'string' should be 'String'
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  contactNumber: { type: Number, required: true } // 'number' should be 'Number'
});

const signUpModel = mongoose.model("Signup", signUpSchema);
module.exports = signUpModel;
