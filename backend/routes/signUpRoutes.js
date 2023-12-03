const express = require('express');
const { Signup, validateSignup } = require('../models/signup');
//const { error } = Signup.validateSignup(req.body);

const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
// POST a new user
// router.post('/signup', async (req, res) => {
//   try {
//    // const { error } = Signup.validateSignup(req.body);

//     if (error) {
//       return res.status(400).send({ message: error.details[0].message });
//     } 

//     const existingUser = await Signup.findOne({ email: req.body.email });

//     if (existingUser) {
//       return res.status(409).send({ message: "User with given email already exists" });
//     }

//     const salt = await bcrypt.genSalt(Number(process.env.SALT));
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     const newUser = new Signup({
//       name: req.body.name,
//       gender: req.body.gender,
//       dob: req.body.dob,
//       contactNumber: req.body.contactNumber,
//       email: req.body.email,
//       username: req.body.username,
//       password: hashPassword,
//       confirmPassword: req.body.confirmPassword,
//     });

//     await newUser.save();
//     res.status(201).send({ message: "User created successfully" });

//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// });
const JWT_SECRET = "mit132334#@$$$";

router.post('/signUpfff', [
  // Validate the name field
  body('name').notEmpty().isLength({ max: 255 }),

  // Validate the email field
  body('email').notEmpty().isEmail(),

  // Validate the password field
  body('cpassword').notEmpty().isLength({ min: 1 }),

  // Validate the confirm password field
  body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.cpassword) {
          throw new Error('Password confirmation does not match password');
      }
      return true;
  }),
], async (req, res) => {
  var success = false;

  // Check if there are any validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);

  // Insert the user data into MongoDB
  const { name, email, cpassword, confirmPassword } = req.body;

  Signup.create({ name, email, cpassword: hashedPassword, confirmPassword })
      .then((student) => {
          const payload = { id: student._id }; // MongoDB uses _id instead of id
          const token = jwt.sign(payload, JWT_SECRET);
          console.log(token);
          success = true;
          res.status(201).json({ success, student, token });
      })
      .catch((error) => {
          console.log("Error :", error);
          res.status(500).json({ success, error: "Internal Server Error" });
      });
});


// router.post('/signup', [
//   // Validate the name field
//   body('name').notEmpty().isLength({ max: 255 }),

//   // Validate the email field
//   body('email').notEmpty().isEmail(),

//   // Validate the password field
//   body('cpassword').notEmpty().isLength({ min: 1 }),

//   // Validate the confirm password field
//   body('confirmPassword').custom((value, { req }) => {
//       if (value !== req.body.cpassword) {
//           throw new Error('Password confirmation does not match password');
//       }
//       return true;
//   }),
// ], async (req, res) => {
//   var success = false;

//   // Check if there are any validation errors
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//       return res.status(400).json({ success, errors: errors.array() });
//   }

//   // Hash the password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(req.body.cpassword, salt);

//   // Insert the user data into MongoDB
//   const { name, email, cpassword, confirmPassword ,gender , dob , contactNumber , username } = req.body;

//   Signup.create({ name, email, cpassword: hashedPassword, confirmPassword , gender , dob , contactNumber , username })
//       .then((Signup) => {
//           const payload = { id: Signup._id }; // MongoDB uses _id instead of id
//           const token = jwt.sign(payload, JWT_SECRET);
//           console.log(token);
//           success = true;
//           res.status(201).json({ success, Signup, token });
//       })
//       .catch((error) => {
//           console.log("Error :", error);
//           res.status(500).json({ success, error: "Internal Server Error" });
//       });
// });

module.exports = router;
