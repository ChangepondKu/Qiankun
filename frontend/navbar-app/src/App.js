import React from 'react';
import './App.css';
import { Link } from '@reach/router';
import { Home, Briefcase, Mail, User, LogOut, Box, Grid, ShoppingBag } from 'lucide-react';
import { navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  const userState = useSelector((state) => state?.app?.user?.fullname);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    localStorage.removeItem('isLoggedIn');
    dispatch({ type: 'LOGOUT_USER' });
    navigate('/login');
    console.log('Logged out');
  };

  const navigateToProfile = () => {
    navigate('/app1/user');
  };

  return (
     <Navbar/>
    // <Sidebar/>
  );
}

export default App;
