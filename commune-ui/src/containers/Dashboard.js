import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Notes from './Notes.js';
import { useParams } from 'react-router-dom';
import Messages from './Messages.js';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ChatIcon from '@mui/icons-material/Chat';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { updateNotesList, selectNote } from '../store/Reducers';
import { SelectPopUp } from '../components/show-the-select-popup/SelectPopUp.js';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function Dashboard() {
  const dispatch=useDispatch()
  const [activeView, setActiveView] = useState('notes');
  useEffect(() => {
    setActiveView('notes'); // Highlight notes when component mounts
  }, [])
  const handleLinkClick = (view) => {
    setActiveView(view); // Update active view on link click
    dispatch(updateNotesList([]))
    dispatch(selectNote(""))
  };
  let title = ''
  const { noteId } = useParams();
  const noteTitles = useSelector(state => state.notes.list);
  for (let i = 0; i < noteTitles.length; i++) {
    if (noteTitles[i].note_id == noteId) {
      title = noteTitles[i].note_title
    }
  }
  const linkStyle = (view) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: activeView === view ? '#A1CFE8' : 'transparent',
    transform: activeView === view ? 'scale(1.2)' : 'scale(1)',
    transition: 'background-color 0.3s, transform 0.3s',
    margin: '10px',
    color: 'white',
  });
  return (
    <Box sx={{ width: 1, height: "91vh" }}>
      <Box
        display="grid"
        gridTemplateColumns="80px 2fr 5fr"
        sx={{
          height: "91vh",
          '@media (max-width: 768px)': {
            gridTemplateColumns: "60px 7fr"
          }
        }}
      >

        {/* left Sidebar */}

        <Box style={{ height: "91vh" }}>
          <Item
            style={{
              height: "92.5vh",
              color: "black",
              backgroundColor: "#7CB9E8",
              borderRadius: "0px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            {/* Notes Link */}
            <Link
              onClick={() => handleLinkClick('notes')}
              to="/notes"
              style={linkStyle('notes')}
            >
              <EventNoteIcon style={{ fontSize: '30px', transition: 'transform 0.3s' }} />
            </Link>

            {/* Chats Link */}
            <Link
              onClick={() => handleLinkClick('chats')}
              to="/chats"
              style={linkStyle('chats')}
            >
              <ChatIcon style={{ fontSize: '30px', transition: 'transform 0.3s' }} />
            </Link>
          </Item>
        </Box>




        {/* Notes Section */}
        <Box style={{ height: "91vh" }}>
          {activeView === 'notes' ? (
            <Item style={{ height: "92.5vh", color: "black", padding: "0" }}>
              <Notes />
            </Item>
          ) : (
            <Item style={{ height: "85vh", visibility: "hidden" }}></Item>
          )}
        </Box>

        {/* Messages Section */}
        <Box style={{ height: "91vh" }}>
          {activeView === 'notes' && noteId ? (
            <Item style={{ height: "92.5vh", color: "black", backgroundColor: "#ececec", padding: "0" }}>
              <h1><Messages noteId={noteId} title={title} /></h1>
            </Item>
          ) : (
            <Item style={{ height: "92.5vh", color: "black", backgroundColor: "#ececec", padding: "0" }}>
            <h1><SelectPopUp name={"Select Note to Show Messages"} /></h1>
          </Item>
          )}
        </Box>
      </Box>
    </Box>
  );
}
