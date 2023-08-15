const mongoose = require("mongoose");

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/sith-scribe");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectDB;
