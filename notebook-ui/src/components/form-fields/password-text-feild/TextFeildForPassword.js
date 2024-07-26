import React from 'react'
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

export const TextFeildForPassword = (props) => {
    const { t } = useTranslation("global");
    const { password } = props; // Destructure password from props
    return (
        <TextField
            required
            fullWidth
            name="password"
            label={t(`signIn.passwordLabel`)} // Interpolate password into translation key
            type="password"
            id="password"
            autoComplete="new-password"
        />
    );
};
export const TextFeildForConfirmPassword = (props) => {
    const { t } = useTranslation("global");
    const { password } = props; // Destructure password from props
    return (
        <TextField
            required
            fullWidth
            name="confirmpassword"
            label={t(`signIn.confirmPassword`)} // Interpolate password into translation key
            type="password"
            id="password"
            autoComplete="new-password"
        />
    );
};