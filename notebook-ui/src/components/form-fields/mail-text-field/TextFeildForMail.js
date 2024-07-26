import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import z from 'zod'


export const TextFeildForMail = () => {
  const { t,} = useTranslation("global");
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);

  const emailSchema = z.string().email({ message: t("Invalid Email Address") });
  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    // Validate email using Zod
    try {
      if (emailValue.trim() === '') {
        setError(false); // Clear error if field is empty
      } else {
        emailSchema.parse(emailValue);
        setError(false); // Clear error if valid
      }
    } catch (err) {
      setError(true); // Set error if invalid
    }
  };

  return (
    <div>
      <TextField
        type='email'
        required
        fullWidth
        id="email"
        label={t("signIn.emailLabel")}
        name="email"
        autoComplete="email"
        value={email}
        onChange={handleEmailChange}
        error={error}
        helperText={error ? t("Invalid Email  Address") : ''}
      />
    </div>
  );
};
