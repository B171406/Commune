import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

import {ButtonForAuthentication} from '/home/quanteon/notebook1/notebook-ui/src/components/primary-btn/PrimaryButton'
import { CheckBox } from '../../components/form-fields/checkboxes/CheckBox.js';
import { TextFeildForMail } from '../../components/form-fields/mail-text-field/TextFeildForMail.js';
import { TextFeildForPassword } from '../../components/form-fields/password-text-feild/TextFeildForPassword.js';
import { LockOutlined } from '/home/quanteon/notebook1/notebook-ui/src/components/lock_outlined_Icon/LockOutlined.js';
import { AuthHead } from '../../components/auth-heading-typography/AuthHeadingTypography.js';
import img from '/home/quanteon/notebook1/notebook-ui/src/assets/note.jpg'

export default function Home() {
    const paperstyle = { width: 1200 };

    return (
        <>

            <Grid container justifyContent="center">
                <Paper elevation={10} style={{ ...paperstyle, minHeight: '70vh', marginTop: "10vh" }}>
                    <Grid container justifyContent="center" style={{ height: "100%" }}>
                        <Grid item xs={12} sm={6}>
                            <img src={img} alt="Note image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Container component="main" maxWidth="xs" >
                                <CssBaseline />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: "63px"
                                    }}
                                >
                                    <LockOutlined />
                                    <AuthHead name="Sign in" />
                                    <Box component="form" noValidate sx={{ mt: 1 }}>
                                        <TextFeildForMail />
                                        <br></br>
                                        <TextFeildForPassword />
                                        <CheckBox name="Remember me" />
                                        <ButtonForAuthentication name=" Sign In" />
                                        <br></br>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="/forgotPassword" variant="body2" style={{ textDecoration: "none" }}>
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item style={{ display: "flex" }}>
                                                <Typography>Don't have an account? </Typography>&nbsp; &nbsp;
                                                <Link href="/register" variant="body2" style={{ textDecoration: "none" }}>
                                                    Sign Up
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                            </Container>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}

