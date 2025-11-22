import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deepPurple } from '@mui/material/colors';
import Search from '../components/form-fields/searchfields/SearchField';
import FormDialog from '../components/form-fields/form-dialog/FormDialog';
import { getNotes, deleteNote, addNote } from '../services/NoteService';
import { updateNotesList, selectNote } from '../store/Reducers';
import { DialogContentText } from '@mui/material';
import { Heading } from '../components/heading/Heading';
import Loader from '../utils/loder/Loder';
import errorImg from '../assets/error.svg';



const Notes = () => {
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const notes = useSelector(state => state.notes.list);
  const dispatch = useDispatch();

  // Fetch notes on component mount and when created_at changes
  useEffect(() => {
    fetchData();
  }, []); // Fetch data only on mount

  useEffect(() => {
    const createdAtChanged = notes.some(note => note.created_at !== note.previous_created_at);
    if (createdAtChanged) {
      fetchData();
    }
  }, [notes]); // Check if any note's created_at has changed

  useEffect(() => {
    setFilteredNotes(notes.filter(note =>
      note.note_title.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [notes, searchTerm]);

  const fetchData = async () => {
    try {
      const data = await getNotes();
      dispatch(updateNotesList(data));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to fetch notes. Please try again.');
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleCreateClick = () => {
    setIsFormDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setIsFormDialogOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleAddNote = async (noteName) => {
    try {
      await addNote(noteName);
      fetchData();
      handleCloseDialog();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleClick = (noteId) => {
    setSelectedNoteId(noteId);
    dispatch(selectNote({ noteId, noteData: {} }));
  };

  const setNoteTitle = (note_title) => {
    return note_title.length > 10 ? note_title.substring(0, 10) + "...." : note_title;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const istOffset = 5.5 * 60 * 60 * 1000;
    const dateIST = new Date(date.getTime() - istOffset);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    if (dateIST.toDateString() === today.toDateString()) {
      return dateString.substring(11, 16) +
        (parseInt(dateString.substring(11, 13)) >= 12 ? " PM" : " AM")
    } else if (dateIST.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else if (dateIST > lastWeek) {
      return dateIST.toLocaleString('en-US', { weekday: 'long' });
    } else {
      return dateIST.toLocaleDateString();
    }
  };
  function toCamelCase(str) {
    return str
      .split(' ') // Split the string by underscores
      .map((word, index) =>
        index === 0
          ? word.substring(0, 1).toUpperCase() + word.substring(1, word.length) // Lowercase the first word
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize subsequent words
      )
      .join(''); // Join the words back together
  }

  return (
    <>
      <Heading handleClick={handleCreateClick} name={'Notes'} />
      <Search filterNotes={handleSearchChange} lable={"Search By Notes"} />
      <div style={{
        height: "800px",
        maxHeight: "calc(100vh - 195px)",
        overflow: "auto",
      }}>
        {loading && <Loader />} {/* Loader */}
        {error && <div style={{display:"flex",justifyContent:"center",flexDirection:"column",height:"85%"}}>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}> <img src={errorImg} alt="Error" style={{ width: 50, height: 50, objectFit: 'cover' }} /></div>
                    <div style={{marginBottom:"10px",fontSize:"18px"}}>{error}</div>
                </div>
        }{/* Error message */}
        {!loading && !error && filteredNotes.map((note) => (
          <Paper
            key={note.note_id}
            elevation={selectedNoteId === note.note_id ? 10 : 3}
            style={{ padding: '15px', margin: '10px 0px', display: 'flex', alignItems: "center", cursor: 'pointer', borderBottom: "1.5px solid lightgray", borderTop: "1.5px solid lightgray", borderLeft: selectedNoteId === note.note_id ? "6px solid #1034A6" : "none", marginLeft: "1px" }}
            onClick={() => handleClick(note.note_id)}
          >
            <Avatar sx={{ bgcolor: deepPurple[500], marginRight: "8px" }}>
              {setNoteTitle(note.note_title).substring(0, 1).toUpperCase()}
            </Avatar>
            <Link to={`${note.note_id}/messages`} style={{ textDecoration: 'none', color: 'inherit', flex: '1', fontSize: "11px" }}>
              <div style={{ display: "flex" }}>
                <h2 style={{ marginRight: "100%" }}>{setNoteTitle(toCamelCase(note.note_title))}</h2>
              </div>
            </Link>
            <p>
              {formatDate(note.created_at)}
            </p>
            {selectedNoteId === note.note_id && (
              <DeleteIcon
                style={{ cursor: "pointer", marginLeft: "10px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickOpen();
                }}
              />
            )}
               </Paper>
        ))}
      </div>
      <FormDialog open={isFormDialogOpen} handleClose={handleCloseDialog} addNote={handleAddNote} name={"Enter Note Name"} lable={"Enter Note Name"} />
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button onClick={() => handleDeleteNote(selectedNoteId)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Notes;
