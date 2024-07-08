// notesReducer.js
import { SET_NOTE_TITLES, ADD_NOTE_TITLE, DELETE_NOTE_TITLE } from '/home/quanteon/notebook1/notebook-ui/src/store/types/ actionTypes.js';

const initialState = {
    noteTitles: [],
  };
  
  const notesReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_NOTE_TITLES:
        return {
          ...state,
          noteTitles: action.payload,
        };
      case ADD_NOTE_TITLE:
        return {
          ...state,
          noteTitles: [...state.noteTitles, action.payload],
        };
      case DELETE_NOTE_TITLE:
        return {
          ...state,
          noteTitles: state.noteTitles.filter(note => note.note_id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default notesReducer;
