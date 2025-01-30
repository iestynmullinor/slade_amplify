import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/form/Button.js';
import Input from '../components/form/Input.js';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';


function UserLogin({ onAdminLogin, onNonAdminLogin, userPool, onLogout }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();



    const handleSubmit = (e) => {
        e.preventDefault();


        const user = new CognitoUser({
            Username: email,
            Pool: userPool
        })

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password
        })

        user.authenticateUser(authDetails, {
            onSuccess: () => {

                user.getUserAttributes(function(err, result) {
                    if (err) {
                        setError(err.message || JSON.stringify(err));
                        return;
                    }

                    // this is just to show that we can get the attributes for a demo 
                    for (let i = 0; i < result.length; i++) {
                        console.log(
                            'attribute ' + result[i].getName() + ' has value ' + result[i].getValue()
                        );
                    }

                    // result[2] is the user role attribute
                    if (result[2].getValue() === 'admin') {
                        onAdminLogin();
                        navigate('/admin/admin-options');
                    }

                    else if (result[2].getValue() === 'guardian' || result[2].getValue() === 'volunteer') {
                        onNonAdminLogin();
                        navigate('/nonadmin/homepage');
                    }

                    else {
                        setError('User role not found');
                        return;
                    }
                });


            },

            onFailure: err => {
                if (err.code === 'UserNotConfirmedException') {
                    localStorage.setItem('emailToConfirm', email);
                    navigate('/confirm-email');
                }
                setError(err.message || JSON.stringify(err));

            }

        })

    };

    const handleRegisterClick = () => {
        navigate('/register'); // Redirect to RegistrationForm page
    };

    const handleForgotPassword = () => {
        // Handle forgot password logic here
        console.log("Redirecting to reset password page...");
    };

    return (
        <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center"
            style={{
                backgroundImage: 'url(/user-login-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-semibold font-galindo text-center text-gray-800 mb-6">
                    User Login
                </h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg bg-white">
                    <div className="mb-4 w-full">
                        <Input id="email" label="Email:" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full" />
                    </div>
                    <div className="mb-6 w-full">
                        <Input id="password" label="Password:" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full" />
                    </div>
                    <Button type="submit" buttonColor="bg-sladeYellow" placeholderText="Login" className="mb-4 hover:bg-sladeYellow-dark text-white w-full" />

                    {/* Forgot Password link */}
                    <div className="text-center mb-6">
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="text-sm text-sladeGreen hover:underline"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    {/* Text prompting user to register if they don't have an account */}
                    <div className="text-center mb-4 text-sm text-gray-600">
                        Don't have an account? <span className="text-sladeGreen cursor-pointer" onClick={handleRegisterClick}>Register here</span>
                    </div>

                    <Button type="button" onClick={handleRegisterClick} buttonColor="bg-sladeGreen" placeholderText="Register" className="w-full text-white hover:bg-sladeGreen-dark" />
                </form>
            </div>
        </div>
    );
}

export default UserLogin;

