import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Search({ filterNotes }) {
  const [searchValue, setSearchValue] = React.useState('');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    filterNotes(value); // Pass the search value to the filter function passed as prop
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '70ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="standard-multiline-flexible"
          label="Search note..!"
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
