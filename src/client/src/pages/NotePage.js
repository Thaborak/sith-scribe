import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchNotes, deleteNote } from "../services/api";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import CreateNote from "../components/CreateNote";

const NoteWrapper = styled.div`
  padding: 2rem;
`;

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchAllNotes();
  }, []);

  // Fetch all notes from the API
  const fetchAllNotes = async () => {
    try {
      const notesData = await fetchNotes();
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Add a new note to the list of notes
  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  // Edit a note from the list of notes
  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  // Delete a note from the list of notes
  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId); // Call your deleteNote function
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Update the list of notes after editing a note
  const handleNoteEdited = (editedNote) => {
    const updatedNotes = notes.map((note) =>
      note._id === editedNote._id ? editedNote : note
    );
    setNotes(updatedNotes);
    setEditingNote(null); // Reset editing state after editing
  };

  return (
    <div>
      <Header />
      <NoteWrapper>
        <CreateNote
          onAddNote={handleNoteAdded}
          onEditNote={editingNote}
          onNoteEdited={handleNoteEdited}
        />
        <NotesList
          notes={notes}
          onEditNote={handleEditNote}
          onDeleteNote={handleDeleteNote}
        />
      </NoteWrapper>
    </div>
  );
}

export default NotePage;
