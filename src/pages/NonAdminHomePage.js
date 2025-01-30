import {React, useEffect, useState}  from 'react';
import { useNavigate} from 'react-router-dom';

function NonAdminHomePage({ onLogout, userPool }) {

    const navigate = useNavigate();

    const [role, setRole] = useState('');

    useEffect(() => {

        const user = userPool.getCurrentUser();

        if (!user) {
            navigate('/');
            return;
        }

        user.getSession((err, session) => {
            if (err) {
                navigate('/');
                return;
            }

            const attributes = session.getIdToken().payload;

            setRole(attributes['custom:role']);
        });

    }, [navigate, userPool]);

    const handleNonAdminLogout = () => {
        onLogout();
        navigate('/');
    };



    return (
        <div
            className="min-h-[60vh] bg-gray-50 flex items-center justify-center py-8"
            style={{
                backgroundImage: 'url(/homepage-bg.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-3xl font-semibold font-galindo text-center text-gray-800 mb-6">
                Hello! Thanks for being a {role}!
                </h2>
                <p className="text-gray-600 text-center mb-6">
                To amend your details, please contact: {' '} 
                <a href="mailto:example@sladegarden.com" className="text-blue-500 underline">
                    example@sladegarden.com
                </a>.
                </p>
                <div className="flex justify-center">
                <button
                    onClick={handleNonAdminLogout}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                >
                    Log out
                </button>
                </div>
            </div>
            </div>
    );
}

export default NonAdminHomePage;