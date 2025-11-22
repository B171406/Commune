import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getMessages } from '../services/MessageService';
import { Paper, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AddIcon from '@mui/icons-material/Add';
import MoodIcon from '@mui/icons-material/Mood';
import { postMessages } from '../services/MessagePostService';
import {updatetime} from '../services/LastModified'
import { selectNote } from '../store/Reducers';
import Loader from '../utils/loder/Loder'; // Adjusted path assuming 'Loader' component location
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Picker from 'emoji-picker-react';


export default function Messages(props) {
    const dispatch = useDispatch();
    const [entermessage, setEnterMessage] = useState(''); // State variable to hold the input value
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef(null);
    const userHasScrolled = useRef(false); // Ref to track if user has manually scrolled
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages(); // Fetch messages initially
    }, [props.noteId]);

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom after messages update
    }, [messages]);

    const scrollToBottom = () => {
        if(!loading){
        if (scrollContainerRef.current && !userHasScrolled.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
      }
    };

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const data = await getMessages(props.noteId);
            setMessages(data);
            setError(null); // Clear error state if fetch is successful
        } catch (error) {
            console.error('Error fetching messages:', error);
            setError('Error fetching messages. Please try again.'); // Set error message
        } finally {
            setLoading(false);
        }
    };

    const handleMessageChange = (event) => {
        setEnterMessage(event.target.value); // Update message state with input value
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
    
        // Adjust the date to IST
        const dateIST = new Date(date.getTime() + istOffset);
        
        // Format to 'YYYY-MM-DD HH:MM:SS'
        const formattedDate = dateIST.toISOString().slice(0, 19).replace('T', ' ');
        console.log(formattedDate);
        
        return formattedDate; // Returns the date in IST
    };
    
    const handleSendMessage = async () => {
        try {
            const formattedTime = formatDate(new Date());
            await postMessages(props.noteId, entermessage);
            await updatetime(props.noteId, formattedTime);
            await fetchMessages();
            setEnterMessage('');
        } catch (error) {
            console.error('Error sending or fetching messages:', error);
            setError('Error sending or fetching messages. Please try again.'); // Set error message
        }
    };
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior (form submission)
            handleSendMessage(); // Call send message function
        }
    };

    useEffect(() => {
        const payload = {
            noteId: props.noteId,
            noteData: messages,
        };
        dispatch(selectNote(payload)); // Dispatch selected note data
    }, [messages, props.noteId, dispatch]);

    const handleScroll = () => {
        // When user scrolls manually, update userHasScrolled ref
        if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
            if (scrollHeight - scrollTop !== clientHeight) {
                userHasScrolled.current = true;
            } else {
                userHasScrolled.current = false;
            }
        }
    };



    // Function to group messages by date
    // Function to group messages by date categories
    const groupMessagesByDateCategories = (messages) => {
        return messages.reduce((groupedMessages, message) => {
            // Get message date
            const messageDate = new Date(message.sent_at);
            
            // Adjust for IST (UTC+5:30)
            const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
            const dateIST = new Date(messageDate.getTime() - istOffset);
    
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            
            // Reset time part of today's date to compare just the dates
            today.setHours(0, 0, 0, 0);
            
            // Determine category
            let category;
            if (dateIST.toDateString() === today.toDateString()) {
                category = 'Today';
            } else if (dateIST.toDateString() === yesterday.toDateString()) {
                category = 'Yesterday';
            } else if (dateIST > lastWeek) {
                category = dateIST.toLocaleString('en-US', { weekday: 'long' }); // Day of the week
            } else {
                // Format date as needed (e.g., '2024-07-12')
                category = dateIST.toISOString().split('T')[0];
            }
    
            // Add message to the category
            if (!groupedMessages[category]) {
                groupedMessages[category] = [];
            }
            groupedMessages[category].push(message);
    
            return groupedMessages;
        }, {});
    };
    
    const groupedMessages = groupMessagesByDateCategories(messages);
    
    function toCamelCase(str) {
        return str
            .split(' ') // Split the string by underscores
            .map((word, index) => 
                index === 0 
                    ? word.substring(0,1).toUpperCase()+word.substring(1,word.length) // Lowercase the first word
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize subsequent words
            )
            .join(''); // Join the words back together
    }
    const onEmojiClick = (event, emojiObject) => {
        console.log(event.emoji)
        setEnterMessage(prevInput => prevInput + event.emoji);
        setShowEmojiPicker(false);
    };
    return (
        <div>
            <div style={{ backgroundColor: "#B0C4DE", height: "60px", position: "sticky", top: "0", zIndex: "10", display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }} style={{ margin: "10px 10px" }}>{props.title.substring(0, 1).toUpperCase()}</Avatar>
                <h6 style={{ margin: "0", padding: "10px 0", textAlign: "center" }}>{toCamelCase(props.title)}</h6>
                {/* <Search  lable={"Search messages....!"} /> */}
            </div>
            <div
                style={{
                    height: "800px",
                    maxHeight: "calc(100vh - 189px)",
                    overflow: "auto",
                    padding: "10px",
                }}
                ref={scrollContainerRef}
                onScroll={handleScroll} // Listen for scroll events
            >
             {error ? (
                <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</div>
            ) : (
                <>
                    {loading && <Loader />}
                    {!loading && Object.keys(groupedMessages).length > 0 ? (
                        Object.keys(groupedMessages).map((category) => (
                            <div key={category}>
                                <div style={{ backgroundColor: "white", display: "inline-block", padding: "5px 15px", borderRadius: "8px" }}>
                                    <h6 style={{ fontWeight: "normal", fontSize: "15px" }}>{category}</h6>
                                </div>
                                {groupedMessages[category].map((message) => (
                                    <Paper
                                        key={message.id}
                                        style={{
                                            color: '#000',
                                            margin: "5px 0",
                                            padding: "10px",
                                            backgroundColor: "white",
                                            border: "1px solid #ccc",
                                            maxWidth: "400px",
                                            width: "fit-content",
                                            borderRadius: "8px",
                                            borderTopRightRadius: "0px",
                                            borderTopLeftRadius: "8px",
                                            borderBottomRightRadius: "8px",
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ maxWidth: '70%', wordBreak: 'break-word' }}>
                                                <h6 style={{ margin: 0, fontWeight: 'normal' }}>
                                                    {message.message_content}
                                                </h6>
                                            </div>
                                            <div style={{ fontSize: '0.4em', color: 'gray', marginLeft: "20px", display: "flex", alignSelf: "flex-end" }}>
                                                {message.sent_at.substring(11, 16) + (parseInt(message.sent_at.substring(11, 13)) >= 12 ? " PM" : " AM")}<DoneAllIcon style={{ height: "15px" }} />
                                            </div>
                                        </div>
                                    </Paper>
                                ))}
                            </div>
                        ))
                    ) : (
                        !loading && <p style={{ fontSize: "20px", fontWeight: "normal", textAlign: 'center' }}>No messages</p>
                    )}
                </>
            )}
            </div>

            <div style={{ backgroundColor: "#B0C4DE", height: "60px", position: "sticky", bottom: "0", zIndex: "10" }}>
                <div style={{ position: 'relative', maxWidth: '100%', marginLeft: "10%", marginRight: "10%", display: "flex", alignItems: "center" }}>
                    {/* <MoodIcon style={{ marginRight: "20px",cursor:"pointer" }} />
                    <AddIcon style={{ marginRight: "10px",cursor:"pointer" }} /> */}
                          <MoodIcon
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        style={{ marginRight: "20px", cursor: "pointer" }}
                    />
                    {showEmojiPicker &&
                        <Picker
                            style={{ position: 'absolute', bottom: '70px', right: '10px', zIndex: '1000' }}
                            onEmojiClick={onEmojiClick}
                        />
                    }
                    <input
                        type='text'
                        placeholder='Enter a message...'
                        value={entermessage}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyDown}
                        style={{
                            flex: '1',  // Take remaining space
                            margin: "5px 10px",
                            height: '50px',
                            padding: '10px',
                            paddingRight: '40px', // adjust padding to accommodate the icon
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box', // include padding and border in the element's total width and height
                            fontSize: '16px',
                        }}
                    />
                    <SendIcon onClick={handleSendMessage} style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', marginRight: "10px" }} />
                </div>
            </div>

        </div>
    );
}
