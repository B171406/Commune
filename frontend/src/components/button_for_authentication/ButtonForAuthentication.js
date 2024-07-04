import React from 'react'
import Button from '@mui/material/Button';

export const ButtonForAuthentication = (props) => {
    return (
        <div>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                {props.name}
            </Button>
        </div>
    )
}
