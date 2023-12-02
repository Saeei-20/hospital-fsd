const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String ,
    age: String ,
    gender: String ,
    weight: String ,
    bloodGroup: String ,
    contactNumber: Number ,
    address: String ,
    symptoms: String ,
    pastMedicalIssues: String ,
});

module.exports = mongoose.model("User", userSchema);