import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  noteTitles: [], // Initial state
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNoteTitles(state, action) {
      state.noteTitles = action.payload;
    },
    addNoteTitle(state, action) {
      state.noteTitles.push(action.payload);
    },
    deleteNoteTitle(state, action) {
      state.noteTitles = state.noteTitles.filter(note => note.note_id !== action.payload);
    },
  },
});

export const { setNoteTitles, addNoteTitle, deleteNoteTitle } = notesSlice.actions;

export default notesSlice.reducer;
