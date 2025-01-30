import React from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

function AdultHome({ isAuthenticated, onLogout }) {
    return (
        <div className="min-h-screen flex flex-col">
            {isAuthenticated ? (
                <>
                    <h1 className="text-3xl font-semibold text-center mt-12">Thank you for visiting us today</h1>
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition mt-8 mx-auto"
                        onClick={onLogout}
                    >
                        Sign Out
                    </button>
                </>
            ) : (
                <>
                    <header className="flex justify-center mt-12">
                        <img
                            className="w-64 h-auto"
                            src="/slade-social-media.png"
                            alt="Slade Gardens Adventure Playground"
                        />
                    </header>
                    <div className="flex justify-center space-x-8 mt-16">
                        <div className="flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-lg w-72">
                            <Link
                                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition mb-4"
                                to="/admin/signin"
                            >
                                Check In/Check Out
                            </Link>
                            <p className="text-center text-sm text-gray-600">
                                Please enter your email to check in or check out
                            </p>
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
}

export default AdultHome;

