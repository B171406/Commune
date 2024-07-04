import React from 'react'
import Typography from '@mui/material/Typography';

export const AuthHead = (props) => {
    return (
        <div>
            <Typography component="h1" variant="h5">
                {props.name}
            </Typography>
        </div>
    )
}
