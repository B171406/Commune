import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

import img from '/home/quanteon/notebook1/notebook-ui/src/assets/note.jpg'

import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {ButtonForAuthentication} from '/home/quanteon/notebook1/notebook-ui/src/components/primary-btn/PrimaryButton'
import { CheckBox } from '../../../components/form-fields/checkboxes/CheckBox.js';
import { TextFeildForMail } from '../../../components/form-fields/mail-text-field/TextFeildForMail.js';
import { TextFeildForPassword } from '../../../components/form-fields/password-text-feild/TextFeildForPassword.js';
import { LockOutlined } from '/home/quanteon/notebook1/notebook-ui/src/components/lock_outlined_Icon/LockOutlined.js';
import { AuthHead } from '../../../components/auth-heading-typography/AuthHeadingTypography.js';

// Import CSS file
import './signUpStyles.scss';

export default function Register() {
    const { t, i18n } = useTranslation("global");

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
          email: data.get('email'),
          password: data.get('password'),
        });
      };

    return (
        <>
            {/* Main content */}
            <Grid container justifyContent="center">
                <Paper elevation={10} className="paper">
                    <Grid container justifyContent="center" style={{ height: "100%" }}>
                        <Grid item xs={12} sm={6}>
                            <img src={img} alt="Note image" className="image" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Container component="main" maxWidth="xs">
                                <Box
                                    sx={{
                                        marginTop: 8,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                    }}
                                    className="container"
                                >
                                    <LockOutlined />
                                    <AuthHead name={t("signIn.signUpLink")} />
                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} className="form">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    autoComplete="given-name"
                                                    name="firstName"
                                                    required
                                                    fullWidth
                                                    id="firstName"
                                                    label={t("signUp.firstname")}
                                                    autoFocus
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    id="lastName"
                                                    label={t("signUp.lastname")}
                                                    name="lastName"
                                                    autoComplete="family-name"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFeildForMail />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextFeildForPassword />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <CheckBox name={t("signUp.termsConditions")} />
                                            </Grid>
                                        </Grid>
                                        <ButtonForAuthentication name={t("signIn.signUpLink")} />
                                        <Grid container justifyContent="center">
                                            <Grid item style={{ display: "flex" }}>
                                                <Typography>{t("signUp.alredyHaveAccount")}</Typography> &nbsp; &nbsp;
                                                <Link href="/" variant="body2"  style={{textDecoration : "none"}}>
                                                    {t("signIn.title")}
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
