import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: 'eu-north-1_cewAf2KLj',
    ClientId: 'ag8s4lobrpfb92n4nclidu0p5'
}

const userPool = new CognitoUserPool(poolData);

function HomePage({ onLogout }) {
    const navigate = useNavigate();

    const handleAdminSignOut = () => {
        onLogout();
        navigate('/');

    }

    const getCurrentUserToken = () => {
        const user = userPool.getCurrentUser();
        if (!user) {
            console.error("No user is currently signed in");
            return null;
        }
    
        let token = null;
        user.getSession((err, session) => {
            if (err) {
                console.error("Error retrieving session:", err);
                return;
            }
            if (!session.isValid()) {
                console.error("Session is invalid");
                return;
            }
    
            token = session.getIdToken().getJwtToken(); // Get the access token
        });
    
        return token;
    };    


const createItem = async () => {
    const url = "https://phtnjwybgk.execute-api.eu-north-1.amazonaws.com/efvdsc/DynamoDBManager"

    const token = getCurrentUserToken(); // Get token before request
    console.log("Token:", token);

    if (!token) {
        console.error("Failed to retrieve token");
        return;
    }

    const currentDate = new Date().toISOString(); // Generate date-time string
    // concatenate a random string to the date-time string to ensure uniqueness
    const id_val = currentDate + "-" + Math.random().toString(36).substring(7);

    const payload = {
        operation: "create",
        payload: {
            Item: {
                id: id_val,
                number: 15
            }
        }
    };


    axios.post(url, payload, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": token // Include token in the request
        }
    })
    .then(response => console.log("Response:", response.data))
    .catch(error => console.error("Error creating item:", error));
}  ;


    return (
        <>
            <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center py-8"
                style={{
                    backgroundImage: 'url(/homepage-bg.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
                    <h2 className="text-3xl font-semibold font-galindo text-center text-gray-800 mb-6">
                        I am a...
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Carer / Parent */}
                        <div className="box bg-sladeYellow p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <Link to="/admin/carer-email" className="block text-center text-gray-800 font-semibold text-lg">
                                Stay and play parent / carer
                            </Link>
                        </div>

                        {/* Young Person */}
                        <div className="box bg-sladeGreen p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <Link to="/admin/young-person" className="block text-center text-white font-semibold text-lg">
                                APG <br /> Young person
                            </Link>
                        </div>

                        {/* Volunteer */}
                        <div className="box bg-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <Link to="/admin/volunteer" className="block text-center text-white font-semibold text-lg">
                                Volunteer
                            </Link>
                        </div>

                        {/* Visitor */}
                        <div className="box bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                            <Link to="/admin/visitor" className="block text-center text-white font-semibold text-lg">
                                Visitor
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
            <div className="flex justify-center items-center ">
                <button onClick={handleAdminSignOut}
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition"
                >
                    Admin Sign Out
                </button>
            </div>
            <div className="flex justify-center items-center ">
                <button onClick={createItem}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 transition"
                >
                    Update DynamoDB
                </button>
            </div>
        </>
    );
}

export default HomePage;



