import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import { LoginPage } from './components/Login/LoginPage';
import { start } from 'qiankun';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import NotFound from './components/404/NotFound';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const state = useSelector((state) => state);
  const loggedInStatus = sessionStorage.getItem('isLoggedIn');

  useEffect(() => {
    if (loggedInStatus === 'true') {
      try {
        setIsLoggedIn(true);
        start({
          sandbox: { strictStyleIsolation: true },
          prefetch: 'all',
          singular: false,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setIsLoggedIn(false);
    }

  }, [loggedInStatus]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
    start({
      sandbox: { strictStyleIsolation: true },
      prefetch: 'all',
      singular: false,
    });
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <LoginPage handleLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          {/* Navbar */}
          <div id="navbar-container">
          </div>

          {/* Main Content */}
          <div id="container">
            {/* <Routes>
              <Route path="/" element={<Navigate to="/app1" replace />} />
            </Routes> */}
            {/* Specific containers for micro-frontends */}
            <div id="micro-app-1-container"></div>
            <div id="micro-app-2-container"></div>
            <div id="micro-app-3-container"></div>
           
          </div>

          {/* Footer */}
          <div id="footer-container">
          </div>
        </div>
      )}
    </Router>
  );

}

export default App;
