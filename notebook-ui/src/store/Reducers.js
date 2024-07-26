import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  notes: {
    list: [],
    selectedNoteId: "",
    selectedNoteData: [],
  },
  auth: {
    isAuthenticated: false,
    token: "",
    user: {},
  },
  app: {
    isAppReady: false,
    
  },
  chats: {
    list: [],
    selectedChatId: "",
    selectedChatData: [],
  },
};

// Slice for notes
export const notesSlice = createSlice({
  name: 'notes',
  initialState: initialState.notes,
  reducers: {
    updateNotesList: (state, action) => {
      state.list = action.payload;
    },
    selectNote: (state, action) => {
      state.selectedNoteId = action.payload.noteId;
      state.selectedNoteData = action.payload.noteData;
    },
    logout1: (state) => {
      state.list = [];
      state.selectedNoteId = "";
      state.selectedNoteData = [];
    },
  },
});

// Slice for auth
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState.auth,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = "";
      state.user = {};
    },
  },
});

// Slice for app
export const appSlice = createSlice({
  name: 'app',
  initialState: initialState.app,
  reducers: {
    setAppReady: (state) => {
      state.isAppReady = true;
    },
  },
});



export const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialState.chats,
  reducers: {
    updateChatList: (state, action) => {
      state.list = action.payload;
    },
    selectChat: (state, action) => {
      state. selectedChatId = action.payload.chatId;
      state. selectedChatData = action.payload.chatData;
    },
    logout2: (state) => {
      state.list = [];
      state.selectedChatId  = "";
      state. selectedChatData= [];
    },
  },
});

// Export actions
export const { updateNotesList, selectNote ,logout1} = notesSlice.actions;
export const { login, logout } = authSlice.actions;
export const { setAppReady} = appSlice.actions;
export const {updateChatList,selectChat,logout2}=chatsSlice.actions;

// Combine reducers
const rootReducer = {
  notes: notesSlice.reducer,
  auth: authSlice.reducer,
  app: appSlice.reducer,
  chats:chatsSlice.reducer,
};

export default rootReducer;
