import React from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export const Heading = (props) => {
  return (
    <div>
        <div style={{ display: "flex", justifyContent: "space-between", height: "60px" }}>
        <h1 style={{ margin: "10px 10px" }}>{props.name}</h1>
        <Fab color="primary" aria-label="add" onClick={props.handleClick} style={{ margin: "7px 5px", height: "45px", width: "45px" }}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  )
}
