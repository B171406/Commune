import * as React from 'react';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ButtonForAuthentication} from '../button_for_authentication/ButtonForAuthentication'
import { CheckBox } from '../check_box/CheckBox';
import { TextFeildForMail } from '../text_feilds/text_feild_for_mail/TextFeildForMail';
import { TextFeildForPassword } from '../text_feilds/text_feild_for_password/TextFeildForPassword';
import { LockOutlined } from '../lock_outlined_Icon/LockOutlined';
import { AuthHead } from '../authentication_heading/AuthHead';

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <LockOutlined/>
          <AuthHead name=" Sign up"/>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextFeildForMail/>
              </Grid>
              <Grid item xs={12}>
                <TextFeildForPassword/>
              </Grid>
              <Grid item xs={12}>
                   <CheckBox name="Accept terms and conditions..!"/>
              </Grid>
            </Grid>
            <ButtonForAuthentication name="Sign Up"/>
            <Grid container justifyContent="center">
              <Grid item style={{display:"flex"}}>
                <Typography>Already have an account?</Typography> &nbsp; &nbsp;
                <Link href="/" variant="body2" style={{textDecoration:"none"}}>
                   Sign in
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