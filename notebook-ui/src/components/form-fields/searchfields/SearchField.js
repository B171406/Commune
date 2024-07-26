import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Search({ filterNotes,...props }) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    filterNotes(value); 
  };
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30vw',
          '@media (max-width: 768px)': {
           width: '810vw'
          }
         },
        
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-multiline-flexible"
          label={props.lable}
          multiline
          maxRows={4}
          variant="standard"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
    </Box>
  );
}
