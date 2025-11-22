import { Navigate } from "react-router-dom";
import React from 'react';
import { useSelector } from 'react-redux';

export const Auth = ({ children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};