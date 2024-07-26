import axios from 'axios';

// API URL
const API_URL = 'http://localhost:5000/chats';

// Function to add chat name
export const addChatName = async (chat_name, user_id) => {
    try {
        const response = await axios.post(API_URL, { chat_name: chat_name, user_id:user_id });
        if (response.status === 201) {
            console.log('Chat name added successfully');
        } else {
            console.error('Error adding chat name:', response.data);
        }
    } catch (error) {
        console.error('Error adding chat name:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};

export const getChatNames = async (user_id) => {
    try {
      const response = await axios.get(`${API_URL}/${user_id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error; // Re-throw the error to handle it in the component
    }
  };

  export const deleteChat = async (chatId) => {
    try {
      const response = await axios.delete(`${API_URL}/${chatId}`);
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