
import { Navigate } from "react-router-dom";
import React from 'react';
import { useSelector } from 'react-redux';

const NotAuth = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/notes" />;
  }

  return children;
};

export default NotAuth;