// Import the global setup and teardown
require("../test.setup");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../src/server");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Characters Integration Test", () => {
  it("should retrieve character data by name", async () => {
    const characterName = "Luke Skywalker";
    const response = await chai
      .request(app)
      .get(`/api/characters?name=${characterName}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.not.be.empty;

    // Assuming that the response includes character data like name, height, and mass
    const character = response.body[0];
    expect(character.name).to.equal(characterName);
    expect(character.height).to.be.a("string");
    expect(character.mass).to.be.a("string");
  });

  it("should return an empty array for non-existing character name", async () => {
    const nonExistingName = "NonExistingCharacter";
    const response = await chai
      .request(app)
      .get(`/api/characters?name=${nonExistingName}`);

    expect(response).to.have.status(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.be.empty;
  });
});
