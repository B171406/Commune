// Navbar.jsx

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import img from '/home/quanteon/notebook1/frontend/src/assets/notes.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
        <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={img} alt="Note image" style={{ width: 60, height: 60,  objectFit: 'cover' }}></img>
        </Typography>
        <Button color="inherit" onClick={()=>navigate('/')}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
