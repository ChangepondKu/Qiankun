import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link } from '@reach/router';
import { Home, Briefcase, Mail, User, LogOut, ShoppingBag, Menu } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';

function Sidebar() {
    const [activePath, setActivePath] = useState(window.location.pathname);
    const userState = useSelector((state) => state?.app?.user?.fullname);
    const dispatch = useDispatch();
    const [isSidebarVisible, setSidebarVisible] = useState(true); // Visible by default for larger screens

    useEffect(() => {
        const updateActivePath = () => setActivePath(window.location.pathname);
        window.addEventListener('popstate', updateActivePath);
        return () => window.removeEventListener('popstate', updateActivePath);
    }, []);
    

    // Automatically adjust sidebar visibility based on screen size
    useEffect(() => {
        // if (!userState) { //when not is standalone mode
            const handleResize = () => {
                const isMobile = window.innerWidth < 768;
                setSidebarVisible(!isMobile); // Show on larger screens, hide on mobile
            };

            handleResize(); // Run on mount
            window.addEventListener('resize', handleResize); // Add resize listener
            return () => window.removeEventListener('resize', handleResize); // Cleanup
        // }
    }, []);

    const handleLogOut = () => {
        dispatch({ type: 'LOGOUT_USER' });
        localStorage.removeItem('isLoggedIn');
        window.location.reload();
        navigate('/login');
    };

    const navigateToProfile = () => navigate('/app1/user');
    const toggleSidebar = () => setSidebarVisible((prev) => !prev);

    return (
        <>
            {/* Toggle button */}
            <button
                className="btn sidebar-toggle d-lg-none" // Visible only on mobile screens
                onClick={toggleSidebar}
            >
                <Menu size={24} aria-hidden="true" />
            </button>

            <aside
                className={`sidebar ${isSidebarVisible ? 'visible' : 'hidden'}`} // Show/hide sidebar dynamically
            >
                {/* Logo */}
                <div className="sidebar-logo">
                    <Link to="/app1">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRK92_U1UV0i1gMz567I-S1ShinS6x5Ky0Q&s"
                            alt="App Logo"
                        />
                    </Link>
                </div>

                {/* Profile Section */}
                <div className="sidebar-profile">
                    <button className="profile-button" onClick={navigateToProfile}>
                        <span>{userState ? userState.toUpperCase() : 'MY PROFILE'}</span>
                        <User size={18} aria-hidden="true" />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="sidebar-links">
                    <Link
                        to="/app1"
                        className={activePath === '/app1' ? 'active' : ''}
                    >
                        <Home size={18} aria-hidden="true" />
                        Home
                    </Link>
                    <Link
                        to="/app2"
                        className={activePath === '/app2' ? 'active' : ''}
                    >
                        <ShoppingBag size={18} aria-hidden="true" />
                        Products
                    </Link>
                    <Link
                        to="/app2/aboutus"
                        className={activePath === '/app2/aboutus' ? 'active' : ''}
                    >
                        <Briefcase size={18} aria-hidden="true" />
                        About Us
                    </Link>
                    <Link
                        to="/app3"
                        className={activePath === '/app3' ? 'active' : ''}
                    >
                        <Mail size={18} aria-hidden="true" />
                        Contact Us
                    </Link>
                </nav>

                {/* Logout Section */}
                <div className="sidebar-logout">
                    <button className="logout-button" onClick={handleLogOut}>
                        <LogOut size={18} aria-hidden="true" />
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
