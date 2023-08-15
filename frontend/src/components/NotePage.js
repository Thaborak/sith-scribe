import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { fetchNotes, deleteNote } from "../services/api";
import Header from "./Header";
import NotesList from "./NotesList";
import CreateNote from "./CreateNote";

const NoteWrapper = styled.div`
  padding: 2rem;
`;

function NotePage() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchAllNotes();
  }, []);

  const fetchAllNotes = async () => {
    try {
      const notesData = await fetchNotes();
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleNoteAdded = (newNote) => {
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId); // Call your deleteNote function
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

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
