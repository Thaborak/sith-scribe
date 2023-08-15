const config = require("../../config/config");
const mongoose = require("mongoose");
const dbUri = config.MONGODB_URI;
// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
