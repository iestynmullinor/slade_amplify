// src/pages/SignInPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInPage.css';

function SignInPage({ onSignIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder authentication logic
        if (email === 'user@example.com' && password === 'password') {
            onSignIn(); // Set the user as authenticated
            navigate('/homepage'); // Navigate to the homepage
        } else {
            setErrorMessage('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="signin-page">
            <img
                className="homepage-logo"
                src="/slade-social-media.png"
                alt="Slade Gardens Adventure Playground"
            />
            <h2 className="signin-title">Sign In</h2>
            <form className="signin-form" onSubmit={handleSubmit}>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="submit-button" type="submit">
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default SignInPage;
