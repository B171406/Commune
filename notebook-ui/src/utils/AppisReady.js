import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Loder from './loder/Loder'
import { setAppReady } from '../store/Reducers';

export const AppisReady = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch=useDispatch()
  const isAuthenticated = useSelector(state => state.app.isAppReady);

  useEffect(() => {
  
    setTimeout(() => {
        dispatch(setAppReady())
    }, 1000); // Adjust delay as needed (2000ms = 2 seconds)
  }, []);


  // Once loading is complete, check if authenticated
  if (!isAuthenticated) {
    return <Loder />;
  }

  // If authenticated and loading is complete, render children
  return children;
};
