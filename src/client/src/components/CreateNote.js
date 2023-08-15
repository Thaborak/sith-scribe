import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createNote, updateNote } from "../services/api";

const FormWrapper = styled.div`
  margin-top: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  width: 50%;
`;

const TextArea = styled.textarea`
  padding: 0.5rem;
  font-size: 1rem;
  resize: vertical;
`;

const Button = styled.button`
  background-color: black;
  color: yellow;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;

const ResponsiveForm = styled(Form)`
  @media (max-width: 600px) {
    margin-top: 1rem;
  }
`;

// CreateNote component
function CreateNote({ onAddNote, onEditNote, onNoteEdited }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    // If editing note is provided, populate fields
    if (onEditNote) {
      setNoteTitle(onEditNote.title);
      setNoteText(onEditNote.content);
    }
  }, [onEditNote]);

  // Handle note title change
  const handleNoteTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  // Handle note text change
  const handleNoteTextChange = (event) => {
    setNoteText(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (noteTitle.trim() !== "" && noteText.trim() !== "") {
      try {
        if (onEditNote) {
          // Make a PATCH request to update the note
          const editedNote = await updateNote(onEditNote._id, {
            title: noteTitle,
            content: noteText,
          });
          onNoteEdited(editedNote); // Call onNoteEdited after editing
          // Reset form fields
          setNoteTitle("");
          setNoteText("");
        } else {
          const newNote = await createNote({
            // could add dto here
            title: noteTitle,
            content: noteText,
          });
          onAddNote(newNote);
          // Reset form fields
          setNoteTitle("");
          setNoteText("");
        }
      } catch (error) {
        console.error("Error creating/editing note:", error);
      }
    }
  };

  return (
    <FormWrapper>
      <h2>{onEditNote ? "Edit Note" : "Create New Note"}</h2>
      <ResponsiveForm onSubmit={handleSubmit}>
        <Label>Note Title:</Label>
        <Input
          type="text"
          value={noteTitle}
          onChange={handleNoteTitleChange}
          required
        />
        <Label>Note Text:</Label>
        <TextArea
          value={noteText}
          onChange={handleNoteTextChange}
          rows={4}
          required
        />
        <Button type="submit">
          {onEditNote ? "Save Changes" : "Add Note"}
        </Button>
      </ResponsiveForm>
    </FormWrapper>
  );
}

export default CreateNote;
