const express = require("express");
const router = express.Router();
const swapiService = require("../services/swapiService");

// Character lookup route...
router.get("/", swapiService.characterLookup);

module.exports = router;
