import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminOptions() {
    const navigate = useNavigate();

    const handleManagementClick = () => {
        navigate('/admin/management'); 
    };

    const handleUsersClick = () => {
        navigate('/admin/homepage'); 
    };

    return (
        <div
            className="min-h-[60vh] flex items-center justify-center py-8"
            style={{
                backgroundImage: 'url(/admin-options-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl text-center">
                <h2 className="text-3xl font-semibold font-galindo text-gray-800 mb-6">
                    Admin Options
                </h2>
                <div className="space-y-4">
                    <button
                        onClick={handleManagementClick}
                        className="w-full bg-sladeGreen text-white py-2 px-4 rounded-md hover:bg-sladeGreen-dark transition"
                    >
                        Management
                    </button>
                    <button
                        onClick={handleUsersClick}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    >
                        Users
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminOptions;
