const express = require('express');
const Cart = require('../models/cartModel');
const router = express.Router(); 


// GET all users
router.get('/getCart', async (req, res) => {
    try {
        const cart = await Cart.find().sort({ createdAt: 'desc' }).exec();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



  router.post('/addCart', async (req, res) => {
    try {
        console.log(req.body)
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
        res.status(201).json({savedCart, success:true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
});

module.exports = router;
