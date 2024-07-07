import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './containers/public/SignIn'
import Register from './containers/public/SignUp';
import { NotesContainer } from './containers/private/Dashboard';
import Navbar from './components/navbar/Navbar';
import { Nomatch } from './containers/public/no-match/Nomatch';
import store from './redux/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notes" element={<NotesContainer />}>
            <Route path=":noteId" element={<NotesContainer />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
          <Route path="/404" element={<Nomatch />} />
          <Route path='*' element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Router>
    </Provider>
  );
};

export default App;