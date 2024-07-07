import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import Search from '../../components/form-fields/searchfields/SearchField';
import FormDialog from '../../components/form-fields/form_dialog/FormDialog';
import axios from 'axios';
import { setNoteTitles, deleteNoteTitle, addNoteTitle } from '../../redux/notesSlice';

const Notes = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false); // State to control FormDialog visibility
  const [filteredNotes, setFilteredNotes] = useState([]);
  
  const noteTitles = useSelector(state => state.notes.noteTitles);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredNotes(noteTitles); // Initialize filteredNotes with all notes
  }, [noteTitles]); // Update filteredNotes when noteTitles changes

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      const data = response.data;
      dispatch(setNoteTitles(data)); // Dispatch action to set note titles in Redux state
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Handle error state or retry logic here
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/notes/${noteId}`);
      if (response.status === 200) {
        dispatch(deleteNoteTitle(noteId)); // Dispatch action to delete note from Redux state
        fetchData()
        console.log('Note deleted successfully from backend');
      } else {
        console.error('Error deleting note:', response.data);
      }
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
      // Send POST request to add note to backend API
      const response = await axios.post('http://localhost:5000/notes', { note_title: noteName }); 
      // Check if request was successful
      if (response.status === 200) {
        console.log('Note added successfully');  
        // Fetch updated list of notes
        fetchData(); 
        // Close the form dialog
        handleCloseDialog();
      } else {
        console.error('Error adding note:', response.data);
      }
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
            <ClearIcon onClick={() => deleteNote(note.note_id)} style={{ cursor: 'pointer' }} />
          </Paper>
        ))}
      </div>
      <FormDialog open={isFormDialogOpen} handleClose={handleCloseDialog} addNote={handleAddNote} />
    </>
  );
};

export default Notes;
