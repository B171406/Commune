import React from 'react'
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

export const TextFeildForMail = () => {
  const { t, i18n } = useTranslation("global");
  return (
    <div>
            <TextField
                  required
                  fullWidth
                  id="email"
                  label={t("signIn.emailLabel")}
                  name="email"
                  autoComplete="email"
                />
    </div>
  )
}
