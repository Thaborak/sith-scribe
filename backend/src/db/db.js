const mongoose = require("mongoose");
const config = require("./config/config");

const MONGODB_URI =
  config.MONGODB_URI || "mongodb://localhost:27017/sith-scribe";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
