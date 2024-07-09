import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// Import your custom components and assets
import { ButtonForAuthentication } from '/home/quanteon/notebook1/notebook-ui/src/components/primary-btn/PrimaryButton';
import { CheckBox } from '../../../components/form-fields/checkboxes/CheckBox.js';
import { TextFeildForMail } from '../../../components/form-fields/mail-text-field/TextFeildForMail.js';
import { TextFeildForPassword } from '../../../components/form-fields/password-text-feild/TextFeildForPassword.js';
import { LockOutlined } from '/home/quanteon/notebook1/notebook-ui/src/components/lock_outlined_Icon/LockOutlined.js';
import { AuthHead } from '../../../components/auth-heading-typography/AuthHeadingTypography.js';
import img from '/home/quanteon/notebook1/notebook-ui/src/assets/note.jpg';

// Import CSS file
import './signinstyles.scss';
import { signIn } from '../../../services/signInService.js';

export default function Home() {
    const { t, i18n } = useTranslation("global");
    const navigate=useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newFormData = {
            email: data.get('email'),
            password: data.get('password'),
        };
        try {
           await signIn(newFormData)
            const accessToken = localStorage.getItem('accessToken');
            if(accessToken){
            navigate('/notes');
            }
            else{
                navigate('/');
            }
        }
        catch (error) {
            console.error('Login error:', error);
        }
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
                            <Container component="main" maxWidth="xs" >
                                <CssBaseline />
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        marginTop: "63px"
                                    }}
                                    className="container"
                                >
                                    <LockOutlined />
                                    <AuthHead name={t("signIn.title")} />
                                    <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }} className="form">
                                        <TextFeildForMail />
                                        <br></br>
                                        <TextFeildForPassword />
                                        <br></br>
                                        <CheckBox name={t("signIn.rememberMeLabel")} />
                                        <ButtonForAuthentication name={t("signIn.signInButton")} />
                                        <br></br>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="/forgotPassword" variant="body2" style={{ textDecoration: "none",padding:"12px" }}>
                                                    {t("signIn.forgotPasswordLink")}
                                                </Link>
                                            </Grid>
                                            <Grid item style={{ display: "flex" }}>
                                                <Typography>{t("signIn.dontHaveAccount")}</Typography>&nbsp; &nbsp;
                                                <Link href="/register" variant="body2" style={{ textDecoration: "none" }}>
                                                    {t("signIn.signUpLink")}
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </Container>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </>
    );
}
