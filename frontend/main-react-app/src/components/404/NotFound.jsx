import React from 'react'

const NotFound = () => {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <a href="/app1" style={{ color: "#007bff", textDecoration: "none" }}>
                Go Back to Home
            </a>
        </div>
    )
}

export default NotFound;

