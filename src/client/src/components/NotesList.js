import React from "react";
import styled from "styled-components";

const NotesWrapper = styled.div`
  margin-top: 2rem;
`;

const NoteItem = styled.div`
  background-color: #f7f7f7;
  padding: 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NoteText = styled.div`
  flex: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
`;

function NotesList({ notes, onEditNote, onDeleteNote }) {
  return (
    <NotesWrapper>
      <h2>Notes List</h2>
      {notes.map((note) => (
        <NoteItem key={note._id}>
          <NoteText>{note.title}</NoteText>
          <NoteText>{note.content}</NoteText>
          <ButtonGroup>
            <EditButton onClick={() => onEditNote(note)}>Edit</EditButton>
            <DeleteButton onClick={() => onDeleteNote(note._id)}>
              Delete
            </DeleteButton>
          </ButtonGroup>
        </NoteItem>
      ))}
    </NotesWrapper>
  );
}

export default NotesList;
