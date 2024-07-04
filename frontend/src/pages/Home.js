import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Login from '../components/login_container/LoginContainer';
import img from '../assets/note.jpg'

export default function Home() {
    const paperstyle = { width: 1200 };

    return (
        <>
            
            <Grid container justifyContent="center">
                <Paper elevation={10} style={{ ...paperstyle, minHeight: '70vh', marginTop: "10vh"}}>
                    <Grid container justifyContent="center" style={{ height: "100%" }}>
                        <Grid item xs={12} sm={6}>
                            <img src={img} alt="Note image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                           <Login/>                           
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}

