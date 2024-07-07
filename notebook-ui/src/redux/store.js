// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notesSlice';

const store = configureStore({
    reducer: {
        notes: notesReducer,
        // other reducers if any
    },
});

export default store;
