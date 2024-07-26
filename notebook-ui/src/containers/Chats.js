import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import noteIcon from '/home/quanteon/notebook1/notebook-ui/src/assets/img1-removebg-preview.png';
import chatsIcon from '/home/quanteon/notebook1/notebook-ui/src/assets/img2-removebg-preview.png';
import ChatIcon from '@mui/icons-material/Chat';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { ChatContainer } from './ChatContainer.js';
import { MessageContainer } from './MessageContainer.js';
import { updateChatList, selectChat } from '../store/Reducers';
import { SelectPopUp } from '../components/show-the-select-popup/SelectPopUp.js';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Chats = () => {
  const dispatch=useDispatch()
  const [activeView, setActiveView] = useState('chats');
  const handleLinkClick = (view) => {
    setActiveView(view); // Update active view on link click
    dispatch(updateChatList([]));
    dispatch(selectChat(""))
  };
  let title = ''
  const chatId = useSelector(state => state.chats.selectedChatId)

  const chatTitles = useSelector(state => state.chats.list);
  for (let i = 0; i < chatTitles.length; i++) {
    if (chatTitles[i].id == chatId) {
      title = chatTitles[i].chat_name
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

        {/* Left Sidebar */}
     
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
          {activeView === 'chats' ? (
            <Item style={{ height: "92.5vh", color: "black",padding:"0" }}>
              <ChatContainer />
            </Item>
          ) : (
            <Item style={{ height: "85vh", visibility: "hidden" }}></Item>
          )}
        </Box>

        {/* Messages Section */}
        <Box style={{ height: "91vh" }}>
          {activeView=== 'chats' && chatId ? (
            <Item style={{ height: "92.5vh", color: "black", backgroundColor: "#ececec",padding:"0" }}>
              <h1><MessageContainer title={title} selectedUserId={chatId}/></h1>
            </Item>
          ) : (
            <Item style={{ height: "92.5vh", color: "black", backgroundColor: "#ececec", padding: "0" }}>
            <h1><SelectPopUp name={"Select Chat to Show Messages"} /></h1>
          </Item>
          )}
        </Box>
      </Box>
    </Box>
  );
}
