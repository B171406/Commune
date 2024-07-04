import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import img from '../assets/note.jpg'

import SignUp from '../components/sign_up_container/SignUpContainer'

export default function Register() {
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
                           <SignUp/>                           
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}