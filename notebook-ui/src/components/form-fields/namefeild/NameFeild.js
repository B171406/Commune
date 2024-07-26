import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

export const TextFeildName = (props) => {
  const { t } = useTranslation("global");
  const [formData, setFormData] = useState({ firstName: '' });
  const [error, setError] = useState(false);
  const {name}=props
  // Define Zod schema for firstName validation
  const firstNameSchema = z.string()
    .min(1, { message: t("signUp.firstNameMinLength") })
    .max(50, { message: t("signUp.firstNameMaxLength") })
    .regex(/^[A-Za-z\s]*$/, { message: t("signUp.firstNameInvalidCharacters") });


  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setFormData({firstName: value });

    try {
        if (value.trim() === '') {
          setError(false); // Clear error if field is empty
        } else {
            firstNameSchema.parse(value);
            setError(false); // Clear error if valid
        }
      } catch (err) {
        setError(true); // Set error if invalid
      }
  };

  return (
    <div>
      <TextField
        autoComplete="given-name"
        name="firstName"
        required
        fullWidth
        id="firstName"
        label={t(`signUp.${name}`)}
        autoFocus
        value={formData.firstName}
        onChange={handleFirstNameChange}
        error={error}
        helperText={error ? t("Invalid FirstName") : ''}
      />
    </div>
  );
};

