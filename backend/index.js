const express = require("express");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const bcrypt = require('bcrypt');
const dbConnection = require("./dbConnection");
const userRoutes = require("./routes/userRoutes");
//const cartRoutes = require("./routes/cartRoutes");
//const signUpRoutes = require("./routes/signupRoutes");
const signUpModel = require("./models/signup")
const medicinesModel = require ("./models/medicines")
const dotenv = require("dotenv");
const cartModel = require("./models/cart")
dotenv.config({ path: "config.env" });
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST" ,"DELETE"],
  credentials: true
}));


app.use("/api/user", userRoutes);

/* app.use("/api/signup", signUpRoutes) */
app.post('/signUp', async (req, res) => {
  const { name, email, password, username, contactNumber, gender, dob, confirmPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const user = new signUpModel({
      name,
      email,
      password: hashedPassword,
      username,
      contactNumber,
      gender,
      dob,
      confirmPassword: hashedConfirmPassword
    });

    await user.save();
    res.status(200).send("Welcome to the club!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering new user. Please try again.");
  }
});

app.post('/Login', async (req, res) => {
  const{username , password} =req.body
  signUpModel.findOne({username:username})
  .then(user=>{
    if(user){
      bcrypt.compare(password, user.password, (err, response)=>{
        if(response){
          const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '7d'
          })
          res.cookie('token', token)
          return res.json("Success")
          
        }else{
          return res.json("The password is incorrect")
        }
      })
    } else{
      return res.json("No record Found")
    }
  })

});

app.get('/api/medicines', async (req, res) => {
  try {
    const medicines = await medicinesModel.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Assuming you have a route like '/addToCart' in your Express server
app.post('/addToCart', async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    // Validate if name, price, and quantity are present in the request
    if (!name || !price || !quantity) {
      return res.status(400).json({ error: 'Name, price, and quantity are required.' });
    }

    // Create a new cart item
    const cartItem = new cartModel({ name, price, quantity });

    // Save the cart item to the database
    await cartItem.save();

    // Send a success message to the client
    res.status(201).json({ success: true, message: 'Item added to the cart successfully.' });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    // Send an error message to the client
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});


app.get('/cartItems', async (req, res) => {
  try {
    const cartItems = await cartModel.find();
    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/cartItems/:id', async (req, res) => {
  try {
    const itemId = req.params.id;

    // Validate if itemId is present in the request
    if (!itemId) {
      return res.status(400).json({ error: 'Item ID is required.' });
    }

    // Delete the cart item from the database
    await cartModel.findByIdAndDelete(itemId);

    res.status(200).json({ message: 'Medicine deleted from the cart successfully.' });
  } catch (error) {
    console.error('Error deleting medicine from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


dbConnection();
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening on: http://localhost:"+PORT);
});