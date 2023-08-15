const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db/db.js");
const app = express();
const config = require("../config/config");

// Call the connectDB function to establish the database connection
connectDB();

// Use the configuration values
const port = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the build directory
app.use(express.static(path.join(__dirname, "client/build")));

// Routes
const notesRoutes = require("./routes/notes");
const charactersRoutes = require("./routes/characters");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
// Handle other routes or API endpoints here
app.use("/api/notes", notesRoutes);
app.use("/api/characters", charactersRoutes);

// Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export for testing
module.exports = app;
