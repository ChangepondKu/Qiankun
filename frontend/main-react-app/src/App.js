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
  const loggedInStatus = sessionStorage.getItem('isLoggedIn');

  useEffect(() => {
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [loggedInStatus]);

  useEffect(() => {
    if (isLoggedIn) {
      // Delay the Qiankun start until containers are in the DOM
      const startMicroFrontends = () => {
        try {
          start({
            sandbox: { strictStyleIsolation: true },
            prefetch: 'all',
            singular: false,
          });
        } catch (error) {
          console.error('Qiankun Error:', error);
        }
      };

      // Ensure all containers are mounted before starting Qiankun
      const waitForContainers = () => {
        const containers = [
          document.getElementById('micro-app-1-container'),
          document.getElementById('micro-app-2-container'),
          document.getElementById('micro-app-3-container'),
        ];
        if (containers.every((container) => container !== null)) {
          startMicroFrontends();
        } else {
          setTimeout(waitForContainers, 50); // Retry after a short delay
        }
      };

      waitForContainers();
    }
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('isLoggedIn', 'true');
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <LoginPage handleLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          {/* Navbar */}
          <div id="navbar-container">Getting things ready...</div>

          {/* Main Content */}
          <div id="container">
            {/* Specific containers for micro-frontends */}
            <div id="micro-app-1-container"></div>
            <div id="micro-app-2-container"></div>
            <div id="micro-app-3-container"></div>
          </div>

          {/* Footer */}
          <div id="footer-container">Footer Content</div>
        </div>
      )}
    </Router>
  );
}

export default App;
