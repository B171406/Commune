import React, { useState, useEffect } from 'react';
import { getMessages } from '../services/messageService';
import { Paper } from '@mui/material';


export default function Messages(props) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch messages when props.noteId changes
        const fetchMessages = async () => {
            try {
                const data = await getMessages(props.noteId);
                setMessages(data);  // Assuming getMessages returns an array of messages
            } catch (error) {
                console.error('Error fetching messages:', error);
                // Optionally, handle error state or display a message to the user
            }
        };

        fetchMessages();
    }, [props.noteId]);  // Run effect whenever props.noteId changes
    console.log(messages)
    // Render messages or loading indicator
    return (
        <div>
            <div style={{ backgroundColor: "#AAA9AA", height: "60px", position: "sticky", top: "0", zIndex: "10" }}>
                <h4 style={{ margin: "0", padding: "10px 0", textAlign: "center" }}>Messages for Note ID: {props.noteId}</h4>
            </div>
            <div style={{ height:"800px",maxHeight: "calc(100vh - 210px)", overflow: "auto", padding: "10px" }}>
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <Paper key={index} style={{ margin: "20px 0", padding: "10px", backgroundColor: "#f9f9f9", border: "1px solid #ccc",minHeight:"100px",maxWidth:"400px" }}>
                            <h6 style={{ margin: "0", wordWrap: "break-word",padding:"20px" }}>{message.message_content}</h6>
                        </Paper>
                    ))
                ) : (
                    <p>Loading messages...</p>
                )}
            </div>
    
            <div style={{ backgroundColor: "#AAA9AA", height: "60px", position: "sticky", bottom: "0", zIndex: "10" }}>
                <input type="text" style={{ width: "100%", height: "100%", padding: "10px", boxSizing: "border-box", border: "none", fontSize: "16px",border:"1px solid #AAA9AA" }} placeholder="Type your message..." />
            </div>
        </div>
    );
    
}
