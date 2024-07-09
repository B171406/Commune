import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import img from '/home/quanteon/notebook1/notebook-ui/src/assets/notes.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
    const { t, i18n } = useTranslation("global");

    // Function to handle language change
    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang); // Change language using i18n instance
    };
    const handleLogout = () =>{
        localStorage.setItem('accessToken', '');
        navigate('/')
    }
    const navigate = useNavigate();

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
                    <img src={img} alt="Note image" style={{ width: 60, height: 60, objectFit: 'cover' }} />
                </Typography>
                {/* Dropdown for language selection */}
                <select onChange={(e) => handleLanguageChange(e.target.value)} style={{ marginLeft: '10px' }}>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="hn">Hindhi</option>
                </select>
                <Button color="inherit" onClick={() => handleLogout()}>{t('navbar.logout')}</Button> {/* Translate 'Logout' using t function */}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
