const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    manufacturer_name: String,
    type: String,
    pack_size_label: String,
    short_composition1: String,
  });
  

const medicinesModel = mongoose.model("medicines", medicineSchema );
module.exports = medicinesModel;
