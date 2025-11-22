import React, { useEffect, useState, useRef } from 'react';
import { Paper, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import MoodIcon from '@mui/icons-material/Mood';
import SendIcon from '@mui/icons-material/Send';
import { useSelector, useDispatch } from 'react-redux';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from 'axios';
import Loader from '../utils/loder/Loder';
import { addChatName, getChatNames, deleteChat } from '../services/ChatServices';
import { updateChatList, selectChat } from '../store/Reducers';
import Picker from 'emoji-picker-react';



const WEBSOCKET_URL = 'ws://localhost:5000'; // Replace with your WebSocket server URL

export const MessageContainer = ({ title }) => {
    const userId = useSelector(state => state.auth.user.user_id); // Get userId from Redux store
    const [message, setMessage] = useState('');
    const user_id = useSelector(state => state.auth.user?.user_id || null);
    const [messages, setMessages] = useState([]);
    const scrollContainerRef = useRef(null);
    const userHasScrolled = useRef(false); 
    const [loading, setLoading] = useState(true);
    const websocketRef = useRef(null);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch()
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users');
            const userOptions = response.data.map(user => ({
                value: user.user_id,
                label: user.name
            }));
            setUsers(userOptions);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    useEffect(() => {
        const recipientUser = users.find(user => user.label === title);
        if (recipientUser) {
            fetchChatHistory(userId, recipientUser.value);
        }
    }, [users, title, userId, messages]);

    const fetchChatHistory = async (senderId, recipientId) => {
        try {
            const response = await axios.get(`http://localhost:5000/messages/${senderId}/${recipientId}`);
            const chatMessages = response.data.map(msg => ({
                message: msg.message,
                sent: msg.sender_id === senderId,
                sent_at: msg.ist_timestamp
            }));
            setMessages(chatMessages);
        } catch (error) {
            console.error('Error fetching chat history:', error);
        } finally {
            setLoading(false); // Set loading to false after fetching messages
        }
    };

    useEffect(() => {
        websocketRef.current = new WebSocket(WEBSOCKET_URL);

        websocketRef.current.onopen = () => {
            console.log('WebSocket connected');
            websocketRef.current.send(JSON.stringify({ type: 'SET_USER_ID', userId }));
        };

        websocketRef.current.onmessage = (event) => {
            const chatMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [
                ...prevMessages,
                { message: chatMessage.message, sent: false, sent_at: new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString() }
            ]);
            updateChatTime(chatMessage.senderId, userId);
            notifyRecipient();
        };

        websocketRef.current.onclose = () => {
            console.log('WebSocket disconnected');
        };

        return () => {
            websocketRef.current.close();
        };
    }, [userId]);
    const notifyRecipient = () => {
        if (!("Notification" in window)) {
            console.log("Browser does not support notifications");
        } else if (Notification.permission === "granted") {
            new Notification('New Message Received');
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    new Notification('New Message Received');
                }
            });
        }
    };

    const updateChatTime = async (senderId, receiverId) => {
        try {
            // Get sender and receiver names
            const sender = users.find(user => user.value === senderId)?.label;
            const receiver = users.find(user => user.value === receiverId)?.label;

            await axios.put(`http://localhost:5000/chats/${receiverId}/update-time`, {
                senderName: sender,
                receiverName: receiver,
            });

            const data = await getChatNames(userId);
            dispatch(updateChatList(data));
        } catch (error) {
            console.error('Error updating chat updated_at:', error);
        }
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    };
    const sendMessage = async () => {
        if (message.trim()) {
            const recipientUser = users.find(user => user.label === title);
            if (!recipientUser) {
                console.error('Recipient not found');
                return;
            }

            const istTime = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString(); // Get current time in IST

            const chatMessage = {
                type: 'SEND_MESSAGE',
                message,
                recipientId: recipientUser.value,
                senderId: userId,
            };
            websocketRef.current.send(JSON.stringify(chatMessage));
            setMessages((prevMessages) => [
                ...prevMessages,
                { message, sent: true, sent_at: istTime } // Set sent_at to IST time
            ]);


            try {
                await axios.put(`http://localhost:5000/chats/${recipientUser.value}/update-time`, {
                    userId: userId,
                });
            } catch (error) {
                console.error('Error updating chat updated_at:', error);
            }
            const recipientId = recipientUser.value;
            updateChatTime(userId, recipientId);
            setMessage('');
        }
    };


    const scrollToBottom = () => {
        if(!loading){
        if (scrollContainerRef.current && !userHasScrolled.current) {
            const { scrollHeight, clientHeight } = scrollContainerRef.current;
            scrollContainerRef.current.scrollTop = scrollHeight - clientHeight;
        }
      }
    };
    
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

    useEffect(() => {
        scrollToBottom(); // Scroll to bottom when loading is done
    }, [messages]);
    // Function to group messages by date
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

    const toCamelCase = (str) => {
        return str
            .split(' ')
            .map((word, index) =>
                index === 0
                    ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join('');
    };

    const onEmojiClick = (event, emojiObject) => {
        console.log(event.emoji)
        setMessage(prevInput => prevInput + event.emoji);
        setShowEmojiPicker(false);
    };
    return (
        <div>
            <div style={{ backgroundColor: "#B0C4DE", height: "60px", position: "sticky", top: "0", zIndex: "10", display: "flex", alignItems: "center" }}>
                <Avatar sx={{ bgcolor: deepPurple[500] }} style={{ margin: "10px" }}>
                    {title.charAt(0).toUpperCase()}
                </Avatar>
                <h6 style={{ margin: "0", padding: "10px 0", textAlign: "center" }}>{toCamelCase(title)}</h6>
            </div>

            <div style={{
                height: "800px",
                maxHeight: "calc(100vh - 189px)",
                overflow: "auto",
                padding: "10px",
            }} ref={scrollContainerRef}
               onScroll={handleScroll}
            >
                {loading ? (
                    <Loader /> // Display loader while loading
                ) : (
                    Object.keys(groupedMessages).length > 0 ? (
                        Object.keys(groupedMessages).map((category) => (
                            <div key={category}>
                                <div style={{ backgroundColor: "white", display: "inline-block", padding: "5px 15px", borderRadius: "8px" }}>
                                    <h6 style={{ fontWeight: "normal", fontSize: "15px" }}>{category}</h6>
                                </div>
                                {groupedMessages[category].map((msg, index) => (
                                    <Paper
                                        key={index}
                                        style={{
                                            color: '#000',
                                            margin: "5px 0",
                                            padding: "10px",
                                            backgroundColor: msg.sent ? '#d1f7c4' : 'white',
                                            border: "1px solid #ccc",
                                            maxWidth: "400px",
                                            width: "fit-content",
                                            borderRadius: "8px",
                                            borderTopRightRadius: msg.sent ? '0px' : '8px',
                                            borderTopLeftRadius: '8px',
                                            borderBottomRightRadius: '8px',
                                            marginLeft: msg.sent ? 'auto' : '0',
                                            textAlign: msg.sent ? 'right' : 'left',
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                            <div style={{ maxWidth: '75%', wordBreak: 'break-word' }}>
                                                <h6 style={{ margin: 0, fontWeight: 'normal' }}>
                                                    {msg.message}
                                                </h6>
                                            </div>
                                            <div style={{ fontSize: '0.4em', color: 'gray', marginLeft: "20px", display: "flex", alignSelf: "flex-end" }}>
                                                {msg.sent_at.substring(11, 16) + (parseInt(msg.sent_at.substring(11, 13)) >= 12 ? " PM" : " AM")}{msg.sent ? (<DoneAllIcon style={{ height: "15px" }} />) : (<p></p>)}
                                            </div>
                                        </div>
                                    </Paper>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p style={{ fontSize: "20px", fontWeight: "normal" }}>No messages</p>
                    )
                )}
            </div>

            <div style={{ backgroundColor: "#B0C4DE", height: "60px", position: "sticky", bottom: "0", zIndex: "10" }}>
                <div style={{ position: 'relative', maxWidth: '100%', marginLeft: "10%", marginRight: "10%", display: "flex", alignItems: "center" }}>
                    {/* <MoodIcon style={{ marginRight: "20px", cursor: "pointer" }} />
                    <AddIcon style={{ marginRight: "10px", cursor: "pointer" }} /> */}
                    <MoodIcon
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        style={{ marginRight: "20px", cursor: "pointer" }}
                    />
                    {showEmojiPicker &&
                        <Picker
                            style={{ position: 'absolute', bottom: '70px', right: '10px', zIndex: '1000' }}
                            onEmojiClick={onEmojiClick}
                            onKeyDown={handleKeyDown}
                        />
                    }
                    <input
                        type='text'
                        placeholder='Enter a message...'
                        value={message}
                        onChange={handleMessageChange}
                        onKeyDown={handleKeyDown}
                        style={{
                            flex: '1',  // Take remaining space
                            margin: "5px 10px",
                            height: '50px',
                            padding: '10px',
                            paddingRight: '40px', // Adjust padding to accommodate the icon
                            borderRadius: '10px',
                            border: '1px solid #ccc',
                            boxSizing: 'border-box', // Include padding and border in the element's total width and height
                            fontSize: '16px',
                        }}
                    />
                    <SendIcon
                        onClick={sendMessage}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            marginRight: "10px"
                        }}
                    />
                </div>
            </div>

        </div>
    );
};
