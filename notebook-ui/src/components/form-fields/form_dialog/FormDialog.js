import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog = ({ open, handleClose, addNote }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const noteName = formData.get('text');
    addNote(noteName); // Call addNote function passed from parent
    handleClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter Note Name</DialogTitle>
      <DialogContent style={{ width: "29vw" }}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="text"
            name="text"
            label="Enter a note name"
            type="text"
            fullWidth
            variant="standard"
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
