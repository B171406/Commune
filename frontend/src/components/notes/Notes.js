import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from '../form_dialog/FormDialog';
import Search from '../search/Search';
import { Paper } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


const Notes = () => {
  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/notes');
      const data=response.data
      const noteTitle = data.map(note => note.note_title); 
      setNoteTitles( noteTitle); // Assuming response.data is an array of note objects with 'note_title' property
      setFilteredNoteTitles( noteTitle); // Initialize filtered notes with all notes on component mount
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Handle error state or retry logic here
    }
  };



  const [openDialog, setOpenDialog] = useState(false);
  const [noteTitles, setNoteTitles] = useState(["note1", "note2", "note3"]);
  const [filteredNoteTitles, setFilteredNoteTitles] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);


  // Function to add a new note title to the state
  const addNote = (title) => {
    setNoteTitles([...noteTitles, title]);
  };

  // Function to filter note titles based on search value
  const filterNotes = (searchValue) => {
    const filteredTitles = noteTitles.filter(title =>
      title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredNoteTitles(filteredTitles);
  };
  

  // Function to delete a note based on its index
  const deleteNote = (index) => {
    const updatedNotes = [...noteTitles];
    updatedNotes.splice(index, 1); // Remove the note at the specified index
    setNoteTitles(updatedNotes); // Update the state with the updated notes list
  };


  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Notes</h1>
        <Fab color="primary" aria-label="add" onClick={() => setOpenDialog(true)}>
          <AddIcon />
        </Fab>
      </div>
      <Search filterNotes={filterNotes} />
        {filteredNoteTitles.map((title, index) => (   
            <Paper elevation={10} style={{ width: "28vw", height: "6vh", margin: "10px", padding: "20px", display:"flex", justifyContent:"space-between" }}>
                <Link key={index} to={`${index}`} style={{ textDecoration: "none" }}><h2>{title}</h2></Link>
              <ClearIcon  onClick={() => deleteNote(index)} />
            </Paper>
          
        ))}

      <FormDialog open={openDialog} handleClose={() => setOpenDialog(false)} addNote={addNote} />
    </>
  );
};

export default Notes;
