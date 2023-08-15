import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// fetch all notes
export const fetchNotes = async () => {
  const response = await api.get("/notes");
  return response.data;
};

// fetch a single note
export const fetchNote = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

// create a note
export const createNote = async (note) => {
  const response = await api.post("/notes", note);
  return response.data;
};

// update a note
export const updateNote = async (id, note) => {
  const response = await api.put(`/notes/${id}`, note);
  return response.data;
};

// delete a note
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

// fetch character by name
export const fetchCharacterByName = async (name) => {
  try {
    const response = await api.get(`/characters/?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching character:", error);
    return [];
  }
};
