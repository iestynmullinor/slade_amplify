import React, { useState } from "react";
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Link, useNavigate } from 'react-router-dom';


function ConfirmEmail({userPool, onLogin}) {
    const navigate = useNavigate();

    const [confirmationCode, setConfirmationCode] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    

    const email = localStorage.getItem('emailToConfirm');


    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (!email) {
            setError('email not found');
            return;
        }

        const user = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        user.confirmRegistration(confirmationCode, true, (err, result) => {
            if (err) {
                setError(err.message || JSON.stringify(err));
                return;
            }
            setSuccess(true);
            onLogin();
        })

    }

    const handleResendCode = () => {
        const user = new CognitoUser({
            Username: email,
            Pool: userPool
        });

        user.resendConfirmationCode((err, result) => {
            if (err) {
                setError(err.message || JSON.stringify(err));
                return;
            }
            console.log(result);
        })
    }

    return (
        
        <div className="py-8 min-h-screen bg-gray-50 flex items-center justify-center">
        {!success && (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-semibold font-galindo text-center text-gray-800 mb-6">
            Hello
          </h2>
          {email &&
          <h3 className="text-xl font-semibold text-center text-gray-700 mb-4">
            Please check your email for a confirmation code: {email}
          </h3>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirmation Code:
              </label>
              <input
                type="text"
                name="confirmationCode"
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto block"
            >
              Confirm
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-center mt-4">{error}</p>
          )}
          
          <br />
          <button
            onClick={handleResendCode}
            className="text-blue-500 hover:underline mt-4"
          >
            Resend Verification Code
          </button>
        </div>)}
        {success && (
        <div className="p-6 mt-4 bg-white rounded-lg shadow-lg">
            <p className="text-green-500 text-center mt-4 font-bold">
            Email confirmed! Thanks for registering with us!
            </p>
            <div className="flex justify-center mt-4">
            <Link
                to="/"
                className="inline-block text-center text-blue-500 bg-white border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white"
            >
                Done
            </Link>
            </div>
        </div>
        )}
      </div>
      
    )

}

export default ConfirmEmail;