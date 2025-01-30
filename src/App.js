import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import LogInSuccessPage from './pages/LogInSuccessPage'
import LogOutSuccessPage from './pages/LogOutSuccessPage'
import UserLogin from './pages/UserLogin';
import RegistrationForm from './pages/RegistrationForm';
import HomePage from './pages/HomePage';
import AdultHome from './pages/AdultHome';
import NonAdminHomePage from './pages/NonAdminHomePage';
import CarerEmailPage from './pages/CarerEmailPage';
import YoungPersonPage from './pages/YoungPersonPage';
import YoungPersonConfirmPage from './pages/YoungPersonConfirmPage';
import GuardianSignIn from './pages/GuardianSignIn';
import ProtectedRoute from './components/ProtectedRoute';
import ConfirmEmail from './pages/ConfirmEmail';
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import VolunteerPage from './pages/VolunteerPage';
import VisitorPage from './pages/VisitorPage';
import AdminOptions from './pages/AdminOptions';
import ManagementPage from './pages/ManagementPage';
import { CognitoUserPool } from 'amazon-cognito-identity-js';


const poolData = {
    UserPoolId: 'eu-north-1_cewAf2KLj',
    ClientId: 'ag8s4lobrpfb92n4nclidu0p5'
}

const userPool = new CognitoUserPool(poolData);

function App() {
    // Admin authentication state
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
        () => JSON.parse(localStorage.getItem('isAdminAuthenticated')) || false
    );

    useEffect(() => {
        localStorage.setItem('isAdminAuthenticated', JSON.stringify(isAdminAuthenticated));
    }, [isAdminAuthenticated]);

    // User authentication state 
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(
        () => JSON.parse(localStorage.getItem('isUserAuthenticated')) || false
    );

    useEffect(() => {
        localStorage.setItem('isUserAuthenticated', JSON.stringify(isUserAuthenticated));
    }, [isUserAuthenticated]);

    // Non-admin User authentication state
    const [isNonAdminUserAuthenticated, setIsNonAdminUserAuthenticated] = useState(
        () => JSON.parse(localStorage.getItem('isNonAdminUserAuthenticated')) || false
    );

    useEffect(() => {
        localStorage.setItem('isNonAdminUserAuthenticated', JSON.stringify(isNonAdminUserAuthenticated));
    }, [isNonAdminUserAuthenticated]);

    // Admin authentication handlers
    const handleAdminLogin = () => setIsAdminAuthenticated(true);
    const handleAdminLogout = () => {
        setIsAdminAuthenticated(false);
        localStorage.removeItem('isAdminAuthenticated');
    };

    // User authentication handlers 
    const handleUserLogin = () => setIsUserAuthenticated(true);
    const handleUserLogout = () => {
        setIsUserAuthenticated(false);
        localStorage.removeItem('isUserAuthenticated');
    };

    // Non-admin User authentication handlers
    const handleNonAdminUserLogin = () => {
        setIsNonAdminUserAuthenticated(true);
    };
    const handleNonAdminUserLogout = () => {
        setIsNonAdminUserAuthenticated(false);
        localStorage.removeItem('isNonAdminUserAuthenticated');
    };

    // universal logout handler
    const handleLogout = () => {
        userPool.getCurrentUser().signOut();
        handleAdminLogout();
        handleUserLogout();
        handleNonAdminUserLogout();
    };



    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <div className="flex-grow">
                    <Routes>
                        {/* Login Route */}
                        <Route
                            path="/"
                            element={
                                <UserLogin
                                    onAdminLogin={handleAdminLogin}
                                    onNonAdminLogin={handleNonAdminUserLogin}
                                    userPool={userPool}
                                    onLogout={handleLogout}
                                />
                            }
                        />
                    
                        <Route
                            path="/register"
                            element={<RegistrationForm userPool={userPool} />}
                        />
                        <Route
                            path="/confirm-email"
                            element={<ConfirmEmail userPool={userPool} onLogin={handleNonAdminUserLogin} />}
                        />


                        {/* Non Admin Protected Route */}
                        <Route
                            path="/nonadmin/*"
                            element={
                                <ProtectedRoute isAuthenticated={isNonAdminUserAuthenticated}>
                                    <Routes>
                                        <Route
                                            path="/homepage"
                                            element={
                                                <NonAdminHomePage
                                                    onLogout={handleLogout}
                                                    userPool={userPool}
                                                />
                                            }
                                        />
                                    </Routes>
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Protected Routes */}
                        <Route
                            path="/admin/*"
                            element={
                                <ProtectedRoute isAuthenticated={isAdminAuthenticated}>
                                    <Routes>
                                    <Route
                                        path="/admin-options"
                                        element={<AdminOptions />}
                                    />
                                        <Route
                                            path="/homepage"
                                            element={<HomePage onLogout={handleLogout} />}
                                        />
                                        <Route
                                            path="/adulthome"
                                            element={
                                                <AdultHome
                                                    onLogout={handleUserLogout}
                                                />
                                            }
                                        />
                                        <Route
                                            path="/signin"
                                            element={<SignInPage onSignIn={handleUserLogin} />}
                                        />
                                        <Route
                                            path="/login-success"
                                            element={<LogInSuccessPage />}
                                        />
                                        <Route
                                            path="/logout-success"
                                            element={<LogOutSuccessPage />}
                                        />
                                        <Route
                                            path="/carer-email"
                                            element={<CarerEmailPage />}
                                        />
                                        <Route
                                            path="/young-person"
                                            element={<YoungPersonPage />}
                                        />
                                        <Route
                                            path="/volunteer"
                                            element={<VolunteerPage />}
                                        />
                                        <Route
                                            path="/visitor"
                                            element={<VisitorPage />}
                                        />
                                        <Route
                                            path="/young-person-confirm"
                                            element={<YoungPersonConfirmPage />}
                                        />
                                        <Route
                                            path="/who-are-you-with"
                                            element={<GuardianSignIn />}
                                        />

                                        <Route
                                            path="/management"
                                            element={<ManagementPage />}
                                        />
                                    </Routes>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer className="flex-shrink-0" />
            </div>
        </Router>

    );
}

export default App;
