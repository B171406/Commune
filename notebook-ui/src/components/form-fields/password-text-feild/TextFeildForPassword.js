import React from 'react'
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

export const TextFeildForPassword = () => {
    const { t, i18n } = useTranslation("global");
    return (
        <div><TextField
            required
            fullWidth
            name="password"
            label={t("signIn.passwordLabel")}
            type="password"
            id="password"
            autoComplete="new-password"
        /></div>
    )
}
