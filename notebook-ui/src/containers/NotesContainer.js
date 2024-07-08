// Notes.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Search from '../components/form-fields/searchfields/SearchField';
import FormDialog from '../components/form-fields/form_dialog/FormDialog';
import { getNotes, deleteNote, addNote } from '../services/noteService'; // Adjust the import path as per your project structure
import { setNoteTitles, deleteNoteTitle } from '/home/quanteon/notebook1/notebook-ui/src/store/actions/ notesActions.js';

const Notes = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false); // State to control FormDialog visibility
  const [filteredNotes, setFilteredNotes] = useState([]);
  
  const noteTitles = useSelector(state => state.noteTitles);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredNotes(noteTitles); // Initialize filteredNotes with all notes
  }, [noteTitles]); // Update filteredNotes when noteTitles changes

  const fetchData = async () => {
    try {
      const data = await getNotes();
      dispatch(setNoteTitles(data)); // Dispatch action to set note titles in Redux state
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Handle error state or retry logic here
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId, dispatch); // Delete note through service function
      fetchData(); // Fetch updated list of notes
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCreateClick = () => {
    setIsFormDialogOpen(true); // Open FormDialog when create button is clicked
  };

  const handleCloseDialog = () => {
    setIsFormDialogOpen(false); // Close FormDialog
  };

  const handleAddNote = async (noteName) => {
    try {
      await addNote(noteName, dispatch); // Add note through service function
      fetchData(); // Fetch updated list of notes
      handleCloseDialog(); // Close the form dialog
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const filterNotes = (searchTerm) => {
    const filtered = noteTitles.filter(note => note.note_title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredNotes(filtered);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Notes</h1>
        <Fab color="primary" aria-label="add" onClick={handleCreateClick}>
          <AddIcon />
        </Fab>
      </div>
      <Search filterNotes={filterNotes} />
      <div style={{ maxHeight: "78vh", overflow: "auto" }}>
        {filteredNotes.map((note, index) => (
          <Paper key={note.note_id} elevation={3} style={{ padding: '20px', margin: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to={`${note.note_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{note.note_title}</h2>
            </Link>
            <ClearIcon onClick={() => handleDeleteNote(note.note_id)} style={{ cursor: 'pointer' }} />
          </Paper>
        ))}
      </div>
      <FormDialog open={isFormDialogOpen} handleClose={handleCloseDialog} addNote={handleAddNote} />
    </>
  );
};

export default Notes;
