// components/navbar/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import img from '../../assets/note.jpg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { logout, logout1,logout2 } from '../../store/Reducers';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';


const Navbar = () => {
  const dispatch = useDispatch()
  const { t, i18n } = useTranslation("global");
  const navigate = useNavigate();

  // Function to handle language change
  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang); // Change language using i18n instance
  };
  const handleLogout = () => {
    dispatch(logout())
    dispatch(logout1())
    dispatch(logout2())
    localStorage.removeItem('payload');
    navigate('/');
  };
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const name = useSelector(state => state.auth.user.name)
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickAvatar = () => {
    setOpenDialog(true);
    // Additional logic related to opening the dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Additional logic related to closing the dialog
  };


  return (
    <AppBar position="static" >
      <Toolbar>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src={img} alt="Note image" style={{ width: 60, height: 60, objectFit: 'cover' }} />
        </Typography>
        {/* Dropdown for language selection */}
        <select onChange={(e) => handleLanguageChange(e.target.value)} style={{ marginRight: '20px' }}>
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="hn">Hindi</option>
        </select>
        {isAuthenticated ? (
          <Avatar
            sx={{ bgcolor: deepPurple[500], marginLeft: '20px', cursor: 'pointer' }}
            src="/broken-image.jpg"
            onClick={handleClickAvatar}
          ></Avatar>
        ) : (
          <p></p>
        )}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          sx={{ position: 'absolute', bottom: '57vh', left: '84vw', maxHeight: '80vh' }}
        >
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              marginLeft: '100px',
              cursor: 'pointer',
              marginTop: "20px"
            }}
            src="/broken-image.jpg"
          >
            {isAuthenticated ? name.substring(0, 2).toUpperCase() : ''}
          </Avatar>
          <DialogContent sx={{ overflow: "hidden" }}>
            <DialogContentText>
              <Button  sx={{ width: "100%", margin: "5px 0px" }}>Profile</Button>
              <Button  sx={{ width: "100%", margin: "5px 0px" }}>Change Password</Button>
              <Button  sx={{ width: "100%", margin: "5px 0px" }} onClick={() => {
                handleLogout();
                handleCloseDialog();
              }}>{t('navbar.logout')}</Button>
              <br />
              <br />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
