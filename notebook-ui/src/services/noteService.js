
import axios from 'axios';
import { setNoteTitles, deleteNoteTitle } from '/home/quanteon/notebook1/notebook-ui/src/store/actions/ notesActions.js'; // Adjust the import path as per your project structure

const API_URL = 'http://localhost:5000/notes';

export const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const deleteNote = async (noteId, dispatch) => {
  try {
    const response = await axios.delete(`${API_URL}/${noteId}`);
    if (response.status === 200) {
      dispatch(deleteNoteTitle(noteId));
      console.log('Note deleted successfully from backend');
    } else {
      console.error('Error deleting note:', response.data);
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const addNote = async (noteName, dispatch) => {
  try {
    const response = await axios.post(API_URL, { note_title: noteName });
    if (response.status === 200) {
      console.log('Note added successfully');
    } else {
      console.error('Error adding note:', response.data);
    }
  } catch (error) {
    console.error('Error adding note:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};
