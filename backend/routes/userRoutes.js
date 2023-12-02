const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

// GET all users
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: 'desc' }).exec();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// POST a new user
router.post('/addUser', async (req, res) => {
    try {
        console.log(req.body)
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json({savedUser, success:true});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
});

module.exports = router;
