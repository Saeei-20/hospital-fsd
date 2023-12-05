const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    });

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;
