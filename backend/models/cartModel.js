
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    cost: String,
});

module.exports = mongoose.model("Cart", cartSchema);
