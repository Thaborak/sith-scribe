const express = require("express");
const cors = require("cors");
const app = express();
const config = require("../config/config");

// Use the configuration values
const port = config.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const notesRoutes = require("./routes/notes");
const charactersRoutes = require("./routes/characters");

// Heathcheck route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/notes", notesRoutes);
app.use("/api/characters", charactersRoutes);

// Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export for testing
module.exports = app;
