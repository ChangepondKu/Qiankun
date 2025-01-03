import React from 'react';
import { Link } from '@reach/router';
import { Home, Briefcase, Mail, User, LogOut, Box, Grid, ShoppingBag } from 'lucide-react';
import { navigate } from '@reach/router';
import { useDispatch, useSelector } from 'react-redux';
import './Navbar.css';
import Cookies from 'js-cookie';

function Navbar() {
  const userState = useSelector((state) => state?.app?.user?.fullname);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    sessionStorage.removeItem('isLoggedIn');
    // Cookies.remove('authToken')
    dispatch({ type: 'LOGOUT_USER' });
    window.location.reload();
    navigate('/login');
    console.log('Logged out');
  };

  const navigateToProfile = () => {
    navigate('/app1/user');
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/app1" className="text-decoration-none">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRK92_U1UV0i1gMz567I-S1ShinS6x5Ky0Q&s"
            alt="Logo"
            className="logo-img"
          />
          {/* <span>MyApp</span> */}
        </Link>
        <div className="nav-links">
          <Link to="/app1" activeClassName="active">
            <Home className="icon" size={18} />
            Home
          </Link>
          <Link to="/app2" activeClassName="active">
            <ShoppingBag className="icon" size={18} />
            Products
          </Link>
          <Link to='/app2/aboutus' activeClassName="active">
            <Briefcase className="icon" size={18} />
            About Us
          </Link>
          <Link to="/app3" activeClassName="active">
            <Mail className="icon" size={18} />
            Contact Us
          </Link>
        </div>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <button className="profile-button" onClick={navigateToProfile}>
          <span className="profile-username">
            {userState ? userState.toUpperCase() : 'MY PROFILE'}
          </span>
          <User size={18} />
        </button>
        <button className="logout-button" onClick={handleLogOut}>
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="mobile-menu">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <div className="mobile-nav-links">
          <Link to="/app1" activeClassName="active">
            <Home className="icon" size={18} />
            Home
          </Link>
          <Link to="/app2" activeClassName="active">
            <Briefcase className="icon" size={18} />
            Services
          </Link>
          <Link to="/app3" activeClassName="active">
            <Mail className="icon" size={18} />
            Contact Us
          </Link>
          <button className="logout-button" onClick={handleLogOut}>
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
