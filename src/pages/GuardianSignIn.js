import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GuardianSignIn() {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false); // New state to track success message
    const navigate = useNavigate();

    // On component mount, retrieve the email from localStorage
    useEffect(() => {
        const email = localStorage.getItem('carerEmail');
        if (email) {
            // Here you would fetch children associated with the email.
            // Using mock data for demonstration.
            setChildren([
                { id: 1, name: 'Child 1' },
                { id: 2, name: 'Child 2' },
                { id: 3, name: 'Child 3' },
            ]);
        } else {
            // If no email found, navigate back to email submission page
            navigate('/carer-email');
        }
    }, [navigate]);

    const handleNext = () => {
        if (selectedChild) {
            // Store the selected child's info if needed, or pass it to the next page
            localStorage.setItem('selectedChild', selectedChild);
            // Set success state to true to show the success message
            setIsSuccessful(true);
            navigate('/admin/login-success')
        } else {
            setErrorMessage('Please select a child.');
        }
    };

    return (
        <div
            className="min-h-[60vh] flex items-center justify-center py-8"
            style={{
                backgroundImage: 'url(/who-are-you-with-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
                <div>
                    <div className="mb-6 text-center">
                        <h2 className="text-3xl font-semibold font-galindo text-gray-800">
                            Who are you with today?
                        </h2>
                    </div>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div>
                            <label
                                htmlFor="child-select"
                                className="block text-lg font-medium text-gray-700 mb-2"
                            >
                                Select a child:
                            </label>
                            <select
                                id="child-select"
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                <option value="">Select a child</option>
                                {children.map((child) => (
                                    <option key={child.id} value={child.id}>
                                        {child.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errorMessage && (
                            <div className="text-red-500 text-sm text-center">
                                {errorMessage}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            className="w-full bg-sladeYellow text-white py-2 px-4 rounded-md hover:bg-sladeYellow-dark transition"
                        >
                            Next
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default GuardianSignIn;
