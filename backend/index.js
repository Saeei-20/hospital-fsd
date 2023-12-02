const express = require("express");
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const cors = require("cors");
const bcrypt = require('bcrypt');
const dbConnection = require("./dbConnection");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
//const signUpRoutes = require("./routes/signupRoutes");
const signUpModel = require("./models/signup")
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));

// ~ ***************    ADMIN + USER      ***************
app.use("/api/user", userRoutes);
app.use("/api/user", cartRoutes);
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


dbConnection();
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening on: http://localhost:"+PORT);
});