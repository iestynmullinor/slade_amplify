import React from 'react'
import Button from '../components/form/Button';
import { useNavigate } from 'react-router-dom';

function LogInSuccessPage() {
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate("/admin/homepage")
    }

    return (
        <div className="flex h-full flex-col bg-white flex-grow items-center justify-center gap-y-12">
            <h1 className="text-3xl font-galindo text-sladeOrange font-bold text-center">Great, you're all logged in.</h1>
            <h3 className="font-monserrat text-2xl text-center">Enjoy your visit!</h3>
            <h3 className="text-5xl text-center">😎</h3>
            <Button type="button" onClick={handleGoHome} buttonColor="bg-sladeYellow" placeholderText="HOME" className="hover:bg-sladeYellow-dark text-xl text-white mt-5 w-1/4" />
        </div>

    )
}

export default LogInSuccessPage
