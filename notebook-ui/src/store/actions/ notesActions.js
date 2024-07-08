// notesActions.js
import { SET_NOTE_TITLES, ADD_NOTE_TITLE, DELETE_NOTE_TITLE } from '/home/quanteon/notebook1/notebook-ui/src/store/types/ actionTypes.js';

export const setNoteTitles = (noteTitles) => ({
  type: SET_NOTE_TITLES,
  payload: noteTitles,
});

export const addNoteTitle = (noteTitle) => ({
  type: ADD_NOTE_TITLE,
  payload: noteTitle,
});

export const deleteNoteTitle = (noteId) => ({
  type: DELETE_NOTE_TITLE,
  payload: noteId,
});
