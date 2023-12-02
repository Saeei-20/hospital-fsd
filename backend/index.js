const express = require("express");
const cors = require("cors");
const dbConnection = require("./dbConnection");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const signUpRoutes = require("./routes/signupRoutes");
const dotenv = require("dotenv");

dotenv.config({ path: "config.env" });
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// ~ ***************    ADMIN + USER      ***************
app.use("/api/user", userRoutes);
app.use("/api/user", cartRoutes);
app.use("/api/signup", signUpRoutes)

dbConnection();
app.use(express.json());

app.listen(PORT, () => {
  console.log("Listening on: http://localhost:"+PORT);
});
