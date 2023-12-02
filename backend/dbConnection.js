const mongoose = require('mongoose');
const retryIntervalMs = 2000;

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const MONGO_URL = process.env.MONGO_URL
const dbConnection = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    setTimeout(dbConnection, retryIntervalMs);
  }
};

module.exports = dbConnection;

