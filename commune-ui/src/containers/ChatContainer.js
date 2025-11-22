import React, { useState, useEffect } from 'react';
import { Heading } from '../components/heading/Heading';
import Search from '../components/form-fields/searchfields/SearchField';
import { addChatName, getChatNames, deleteChat } from '../services/ChatServices';
import { useSelector, useDispatch } from 'react-redux';
import { updateChatList, selectChat } from '../store/Reducers';
import { Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogContentText } from '@mui/material';
import Select from 'react-select';
import axios from 'axios';
import { date } from 'zod';
import Loader from '../utils/loder/Loder';
import errorImg from '../assets/error.svg';



export const ChatContainer = () => {
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.auth.user?.user_id || null);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [filteredChats, setFilteredChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [open, setOpen] = useState(false);
    const chats = useSelector(state => state.chats.list);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(user_id);
        fetchUsers();
    }, [user_id]);
    useEffect(() => {
        const createdAtChanged = chats.some(note => chats.updated_at !== note.previous_updated_at);
        if (createdAtChanged) {
            fetchData();
        }
    }, [chats]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/users');
            const userOptions = response.data.map(user => ({
                value: user.user_id,
                label: user.name
            }));
            setUsers(userOptions);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Failed to fetch users. Please try again.');
            setLoading(false);
        }
    };
    const handleCreateClick = () => {
        setIsFormDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setIsFormDialogOpen(false);
        setSelectedUser(null);
    };

    const handleAddChatName = async () => {
        if (selectedUser) {
            try {
                await addChatName(selectedUser.label, user_id); // Use label for chat name
                handleCloseDialog();
                fetchData(user_id);
            } catch (error) {
                console.error('Error adding chat name:', error);
                setError('Failed to fetch data. Please try again.');
            }
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getChatNames(user_id);
            dispatch(updateChatList(data));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching chat names:', error);
            setError('Failed to fetch chat names. Please try again.');
            setLoading(false);
        }
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
    };

    useEffect(() => {
        setFilteredChats(chats.filter(chat =>
            chat.chat_name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    }, [chats, searchTerm]);

    const handleClick = (chatId) => {
        setSelectedChatId(chatId);
        dispatch(selectChat({ chatId, chatData: {} }));
    };

    const setChatTitle = (chat_title) => {
        return chat_title.length > 10 ? chat_title.substring(0, 10) + "...." : chat_title;
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDeleteNote = async (chatId) => {
        try {
            await deleteChat(chatId);
            fetchData(user_id);
            handleCloseDialog();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in milliseconds
        const dateIST = new Date(date.getTime() + istOffset);

        const todayIST = new Date(Date.now() + istOffset);
        const yesterdayIST = new Date(todayIST);
        yesterdayIST.setDate(todayIST.getDate() - 1);

        // Adjust time part for IST comparison
        dateIST.setHours(0, 0, 0, 0);
        todayIST.setHours(0, 0, 0, 0);
        yesterdayIST.setHours(0, 0, 0, 0);

        if (dateIST.getTime() === todayIST.getTime()) {
            return date.toLocaleString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
        } else if (dateIST.getTime() === yesterdayIST.getTime()) {
            return "Yesterday";
        } else {
            return dateIST.toLocaleDateString('en-US');
        }
    };


    function toCamelCase(str) {
        return str
            .split(' ') // Split the string by underscores
            .map((word, index) =>
                index === 0
                    ? word.substring(0, 1).toUpperCase() + word.substring(1, word.length) // Lowercase the first word
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize subsequent words
            )
            .join(''); // Join the words back together
    }
    console.log(error)
    return (
        <>
            <Heading handleClick={handleCreateClick} name={"Chats"} />
            <Search filterNotes={handleSearchChange} lable={"Search By Name"} />
            <div style={{ height: "800px", maxHeight: "calc(100vh - 195px)", overflow: "auto" }}>
                {loading && <Loader />} {/* Loader */}
                {error && <div style={{display:"flex",justifyContent:"center",flexDirection:"column",height:"85%"}}>
                    <div style={{display:"flex",justifyContent:"center",marginBottom:"10px"}}> <img src={errorImg} alt="Error" style={{ width: 50, height: 50, objectFit: 'cover' }} /></div>
                    <div style={{marginBottom:"10px",fontSize:"18px"}}>{error}</div>
                </div>
                } {/* Error message */}
                {!loading && !error && filteredChats.map((chat) => (
                    <Paper
                        key={chat.id}
                        elevation={selectedChatId === chat.id ? 10 : 3}
                        style={{ padding: '15px', margin: '10px 0px', display: 'flex', alignItems: "center", cursor: 'pointer', borderBottom: "1.5px solid lightgray", borderTop: "1.5px solid lightgray", borderLeft: selectedChatId === chat.id ? "6px solid #1034A6" : "none", marginLeft: "1px" }}
                        onClick={() => handleClick(chat.id)}
                    >
                        <Avatar sx={{ bgcolor: deepPurple[500], marginRight: "8px" }}>
                            {setChatTitle(chat.chat_name).substring(0, 1).toUpperCase()}
                        </Avatar>
                        <Link to={`${chat.id}/messages`} style={{ textDecoration: 'none', color: 'inherit', flex: '1', fontSize: "11px" }}>
                            <div style={{ display: "flex" }}>
                                <h2 style={{ marginRight: "100%" }}>{setChatTitle(toCamelCase(chat.chat_name))}</h2>
                            </div>
                        </Link>
                        <p>
                            {formatDate(chat.updated_at)}
                        </p>
                        {selectedChatId === chat.id && (
                            <DeleteIcon
                                style={{ cursor: "pointer", marginLeft: "10px" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClickOpen();
                                }}
                            />
                        )}
                    </Paper>
                ))}
            </div>
            <Dialog open={isFormDialogOpen} onClose={handleCloseDialog} >
                <DialogTitle>{"Select a User"}</DialogTitle>
                <DialogContent style={{ height: selectedUser ? "100px" : "350px", width: "600px" }}>
                    {loading && <Loader />} {/* Display loader while fetching users */}
                    {!loading && (
                        <Select
                            options={users}
                            onChange={setSelectedUser}
                            placeholder={"Select a user..."}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancel</Button>
                    <Button onClick={handleAddChatName} disabled={!selectedUser}>Chat</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this chat?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleDeleteNote(selectedChatId)} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
