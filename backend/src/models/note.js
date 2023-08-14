const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
  character: String,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
