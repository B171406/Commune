
import axios from 'axios';


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

export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${API_URL}/${noteId}`);
    if (response.status === 200) {
      console.log('Note deleted successfully from backend');
    } else {
      console.error('Error deleting note:', response.data);
    }
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error; // Re-throw the error to handle it in the component
  }
};

export const addNote = async (noteName) => {
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
