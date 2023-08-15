module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/sith-scribe",
  SWAPI_BASE_URL: "https://swapi.dev/api/",
};
