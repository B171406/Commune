import React from 'react'
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
export const LockOutlined = () => {
    return (
        <div> <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar></div>
    )
}
