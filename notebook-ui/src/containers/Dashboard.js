import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import  Notes  from './NotesContainer.js';
import { useParams } from 'react-router-dom';
import Messages from './Messages.js';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function NotesContainer() {
  const { noteId } = useParams(); 
  

  return (
    <Box sx={{ width: 1, height: "91vh" }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} style={{ height: "91vh" }}>
        <Box gridColumn="span 4" style={{ height: "91vh" }}>
          <Item style={{ height: "92.5vh", color: "black" }}><Notes /></Item>
        </Box>
        <Box gridColumn="span 8" style={{ height: "91vh" }}>
          {noteId ? (
            <Item style={{ height: "92.5vh", color: "black" }}>
              <h1><Messages noteId={noteId}/></h1>
            </Item>
          ) : (
            <Item style={{ height: "91vh", visibility: "hidden" }}></Item>
          )}
        </Box>
      </Box>
    </Box>
  );
}
