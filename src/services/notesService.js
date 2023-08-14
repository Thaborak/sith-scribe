const Note = require("../models/note");

const noteService = {
  async createNote(req, res) {
    try {
      const newNote = await Note.create(req.body);
      res.status(201).json(newNote);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  async getAllNotes(req, res) {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async getNoteById(req, res) {
    try {
      const note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json(note);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  async updateNote(req, res) {
    try {
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(200).json(updatedNote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteNote(req, res) {
    try {
      const deletedNote = await Note.findByIdAndDelete(req.params.id);
      if (!deletedNote) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.status(204).json({ message: "Note deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = noteService;
