const express = require('express');
const Signup = require('../models/signup');
const router = express.Router();

// POST a new user
router.post('/signup', async (req, res) => {
    try {
      const { name, gender, dob, contactNumber, email, username, password, confirmPassword } = req.body;
  
      // Add more specific validation if needed
  
      if (!name || !gender || !dob || !contactNumber || !email || !username || !password || !confirmPassword) {
        return res.status(400).json({ message: 'Missing required fields', success: false });
      }
  
      const newSignup = new Signup({
        name,
        gender,
        dob,
        contactNumber,
        email,
        username,
        password,
        confirmPassword
      });
  
      const savedSignup = await newSignup.save(); // Add await keyword here
  
      res.status(201).json({ savedSignup, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', success: false });
    }
  });
  

module.exports = router;
