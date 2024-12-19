import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { registerUser, validateUser } from '../repository/apiRepository';

export const LoginPage = ({ handleLoginSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign Up
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // For Sign Up
    const [phone, setPhone] = useState();
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (!email || !password || (isSignUp && !name)) {
            setErrorMessage('All fields are required.');
            return;
        }
        // Password validation
        if (isSignUp && password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (isSignUp && password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }
        try {
            setLoading(true);
            if (isSignUp) {
                // Simulate Sign Up API call
                console.log('Sign Up details:', { name, email, password });
                const response = await registerUser({ email, password, phone, fullname: name });
                console.log(response);
                if (response?.status === 201 && response?.statusText === 'Created') {
                    console.log("TRUE");
                    alert('Sign Up successful! You can now log in.');
                    setIsSignUp(false);
                    setName('');
                    setEmail('');
                    setPassword('');
                }
            } else {
                const response = await validateUser({ email, password });
                if (response?.message === 'Login successful') {
                    if (rememberMe) {
                        localStorage.setItem('email', email); // Save email for remember me functionality
                    }
                    handleLoginSuccess();
                    dispatch({ type: 'LOGIN_SUCCESS', payload: response });
                    navigate('/app1');
                } else {
                    setErrorMessage('Invalid email or password.');
                }
            }
        } catch (error) {
            setErrorMessage(error.message || 'An error occurred.');
            setIsSignUp(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                {/* Image Section */}
                <div className="image-section col-lg-7 col-md-0"></div>

                {/* Form Section */}
                <div className="login-form-section col-lg-5 col-md-12">
                    <div className="login-form">
                        {/* Header */}
                        <div className="text-center mb-2">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZRK92_U1UV0i1gMz567I-S1ShinS6x5Ky0Q&s"
                                alt="Logo"
                            />
                            <h4 className='mt-1'>{isSignUp ? 'SIGN UP' : 'WELCOME BACK!'}&nbsp;
                            </h4>

                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} noValidate>
                            {isSignUp && (
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <User />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Full Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="form-group mt-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <Mail />
                                    </span>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group mt-3">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <Lock />
                                    </span>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {isSignUp && (
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Lock />
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {isSignUp && (
                                <div className="form-group">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <Phone />
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Phone Number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {errorMessage && (
                                <div className="error-message">{errorMessage}</div>
                            )}

                            {!isSignUp && (
                                <div className="remember-forgot mt-3 d-flex justify-content-between">
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="remember"
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <label htmlFor="remember" className="ms-2">Remember Me</label>
                                    </div>
                                    <a href="#">Forgot Password?</a>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary mt-3 w-100" disabled={loading}>
                                {loading ? (isSignUp ? 'Signing up...' : 'Logging in...') : (isSignUp ? 'Sign Up' : 'Login')}
                            </button>
                        </form>

                        {/* Toggle Between Login and Sign Up */}
                        <div className="signup-link mt-3 text-center">
                            <p>
                                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                            </p>
                            <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => {
                                    setIsSignUp(!isSignUp);
                                    setEmail('');
                                    setPhone('');
                                    setName('');
                                    setPassword('');
                                    setConfirmPassword('');
                                }}
                            >
                                {isSignUp ? 'Login' : 'Sign Up'}
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
