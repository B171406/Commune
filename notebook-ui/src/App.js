// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './containers/public/signin/SignIn';
import Register from './containers/public/signup/SignUp';
import { NotesContainer } from './containers/Dashboard';
import Navbar from './components/navbar/Navbar';
import { Nomatch } from './containers/no-match/Nomatch';




const App = () => {
  
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<NotesContainer />}>
            <Route path=":noteId/messages" element={<NotesContainer />} />
          </Route>
          <Route path="/404" element={<Nomatch />} />
          <Route path='*' element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
