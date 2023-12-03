const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Signup = require('../models/signup');
const Joi = require("joi");

// Moved the validate function before its usage
const validate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"), // Fixed label name
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { error } = validate(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    const user = await Signup.findOne({ username: req.body.username }); // Changed from userName to username

    if (!user) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).send({ message: "Invalid username or password" }); // Changed status code to 400 for consistency
    }

    // Add logic here for successful login if needed

    res.status(200).send({ message: "Login successful" }); // Changed status code to 200 for consistency

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server Error" });
  }
});

module.exports = router;
