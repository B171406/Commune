import React from 'react'
import TextField from '@mui/material/TextField';

export const TextFeildForPassword = () => {
    return (
        <div><TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
        /></div>
    )
}
