// Import the global setup and teardown
require("../test.setup");

const mongoose = require("mongoose");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../../src/server");
const Note = require("../../../src/models/note");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Notes Integration Test", () => {
  before(async () => {
    // Connect to the test database before running the tests
    await mongoose
      .connect("mongodb://localhost:27018/sith-scribe-test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
      });

    // Clear the test database before running tests
    await Note.deleteMany({});

    // Seed the database with test notes before running the tests
    const testNote1 = new Note({
      title: "Test Note 1",
      content: "This is the content of Test Note 1",
    });
    const testNote2 = new Note({
      title: "Test Note 2",
      content: "This is the content of Test Note 2",
    });
    await Promise.all([testNote1.save(), testNote2.save()]);
  });

  after(async () => {
    // Clear the database after the tests
    await Note.deleteMany({});
    // Disconnect from the test database after running tests
    await mongoose.disconnect();
    Promise.all([Note.deleteMany({}), mongoose.disconnect()]);
  });

  it("should get all notes", async () => {
    const res = await chai.request(app).get("/api/notes");
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("array");
    expect(res.body).to.have.lengthOf(2); // Assuming two notes were seeded
  });

  it("should get a single note", async () => {
    const notes = await Note.find({});
    const res = await chai.request(app).get(`/api/notes/${notes[0]._id}`);
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.title).to.equal("Test Note 1");
    expect(res.body.content).to.equal("This is the content of Test Note 1");
  });

  it("should create a new note", async () => {
    const res = await chai.request(app).post("/api/notes").send({
      title: "Test Note 3",
      content: "This is the content of Test Note 3",
    });
    expect(res).to.have.status(201);
    expect(res.body).to.be.an("object");
    expect(res.body.title).to.equal("Test Note 3");
    expect(res.body.content).to.equal("This is the content of Test Note 3");
  });

  it("should update a note", async () => {
    const notes = await Note.find({});
    const res = await chai.request(app).put(`/api/notes/${notes[0]._id}`).send({
      title: "Test Note 1 Updated",
      content: "This is the updated content of Test Note 1",
    });
    expect(res).to.have.status(200);
    expect(res.body).to.be.an("object");
    expect(res.body.title).to.equal("Test Note 1 Updated");
    expect(res.body.content).to.equal(
      "This is the updated content of Test Note 1"
    );
  });

  it("should delete a note", async () => {
    // Create and save a note
    const note = new Note({
      title: "Test Note 1",
      content: "This is a test note",
    });
    await note.save();

    // Delete the note
    const response = await chai.request(app).delete(`/api/notes/${note._id}`);

    expect(response).to.have.status(204);

    // Verify that the note is deleted
    const deletedNote = await Note.findById(note._id);
    expect(deletedNote).to.be.null;
  });

  // should return a 404 error if a note is not found
  it("should return a 404 error if a note is not found", async () => {
    const nonExistingNoteId = "61234567890abcdef1234567"; // Non-existing ID
    const response = await chai
      .request(app)
      .delete(`/api/notes/${nonExistingNoteId}`);

    expect(response).to.have.status(404);
    expect(response.body.message).to.equal("Note not found");
  });
});
