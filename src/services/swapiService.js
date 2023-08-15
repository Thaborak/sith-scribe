const axios = require("axios");

const swapiService = {
  async characterLookup(req, res) {
    const characterName = req.query.name;
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${characterName}`
      );
      const characters = response.data.results.map((character) => ({
        name: character.name,
        height: character.height,
        mass: character.mass,
      }));
      res.status(200).json(characters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = swapiService;
