import * as React from 'react';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import { useNavigate } from 'react-router-dom';

import {ButtonForAuthentication} from '../button_for_authentication/ButtonForAuthentication'
import { CheckBox } from '../check_box/CheckBox';
import { TextFeildForMail } from '../text_feilds/text_feild_for_mail/TextFeildForMail';
import { TextFeildForPassword } from '../text_feilds/text_feild_for_password/TextFeildForPassword';
import { LockOutlined } from '../lock_outlined_Icon/LockOutlined';
import { AuthHead } from '../authentication_heading/AuthHead';


export default function Login() {
    // const navigate=useNavigate();
    return (
        <Container component="main" maxWidth="xs" >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop:"63px"
                }}
            >
               <LockOutlined />
               <AuthHead name="Sign in"/>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <TextFeildForMail/>
                  <br></br>
                  <TextFeildForPassword />
                  <CheckBox name="Remember me"/>
                  <ButtonForAuthentication name=" Sign In"/>
                    <br></br>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgotPassword" variant="body2" style={{textDecoration:"none"}}>
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item style={{display:"flex"}}>
                           <Typography>Don't have an account? </Typography>&nbsp; &nbsp;
                            <Link href="/register" variant="body2" style={{textDecoration:"none"}}>
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
    );
}