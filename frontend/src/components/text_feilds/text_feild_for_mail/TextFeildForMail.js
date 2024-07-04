import React from 'react'
import TextField from '@mui/material/TextField';

export const TextFeildForMail = () => {
  return (
    <div>
            <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
    </div>
  )
}
