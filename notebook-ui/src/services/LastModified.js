import axios from 'axios';
const API_URL = 'http://localhost:5000/lastmodified/note_id';

export const updatetime = async (noteId,sent_at) => {
  console.log(sent_at)
    try {
      const response = await axios.post(`${API_URL}/${noteId}`,{
        noteId,
        sent_at,
      });
      // console.log(response.data)
      return response.data;
    
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

