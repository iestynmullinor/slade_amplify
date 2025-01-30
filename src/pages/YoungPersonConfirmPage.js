import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/form/Button';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function YoungPersonConfirmPage() {
    const location = useLocation();
    const { firstName, lastName } = location.state || {};
    const navigate = useNavigate()

    const handleSuccess = () => {
        navigate("/admin/login-success")
    }

    const handleTryAgain = () => {
        navigate("/admin/young-person")
    }

    return (
        <div className="flex flex-col h-full bg-white flex-grow items-center justify-center">
            <div>
                <h1 className="text-3xl text-sladeGreen font-galindo font-bold text-center">Are you {firstName} {lastName}?</h1>
            </div>
            <div className="flex justfy-center w-1/2 gap-x-4 mt-8">
                <Button type="button" onClick={handleSuccess} buttonColor="bg-sladeGreen" placeholderText="YES THAT'S ME!" className="hover:bg-sladeGreen-dark w-full text-white text-xl mt-10" />
                <Button type="button" onClick={handleTryAgain} buttonColor="bg-white" placeholderText="NO, TRY AGAIN" className="hover:bg-sladeRed hover:text-white w-full text-xl text-sladeRed border border-sladeRed mt-10" />
            </div>
            <Link to="/privacy-policy" className="text-gray-700 font-monserrat underline underline-offset-1 hover:text-gray-900 mt-20">
                Log in with your name instead
            </Link>.
        </div>
    )
}

export default YoungPersonConfirmPage
