const express = require("express");
const router = express.Router();
const noteService = require("../services/notesService");

// CRUD routes for notes...
router.post("/", noteService.createNote);
router.get("/", noteService.getAllNotes);
router.get("/:id", noteService.getNoteById);
router.put("/:id", noteService.updateNote);
router.delete("/:id", noteService.deleteNote);

module.exports = router;
