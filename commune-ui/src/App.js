// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './containers/public/signin/SignIn';
import Register from './containers/public/signup/SignUp';
import { Dashboard } from './containers/Dashboard';
import Navbar from './components/navbar/Navbar';
import { Nomatch } from './containers/no-match/Nomatch';
import { Auth } from './utils/Auth';
import NotAuth from './utils/NotAuth'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../src/utils/loder/Loder'
import { login } from './store/Reducers';
import { Chats } from './containers/Chats';


const App = () => {
  const dispatch = useDispatch()
  const storedPayloadString = localStorage.getItem('payload');

  if (storedPayloadString) {
    const storedPayload = JSON.parse(storedPayloadString);
    const token = storedPayload.token;
    const user = storedPayload.user;
    const payload = {
      token: token,
      user: user,
    };
    dispatch(login(payload));

  }
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<NotAuth><Home /></NotAuth>} />
          <Route path="/register" element={<Register />} />
          <Route path="/chats" element={<Auth><Chats/></Auth>}>
          <Route path=":chatId/messages" element={<Chats/>} />
          </Route>
          <Route path="/notes" element={<Auth><Dashboard /></Auth>}>
            <Route path=":noteId/messages" element={<Dashboard />} />
          </Route>
          <Route path="/404" element={<Nomatch />} />
          <Route path='*' element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
