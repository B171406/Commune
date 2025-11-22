import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export const CheckBox = (props) => {
    return (
        <div>
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={props.name}
            />
        </div>
    )
}
