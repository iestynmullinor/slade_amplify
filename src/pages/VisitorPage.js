import React, { useState } from 'react';
import Button from '../components/form/Button';
import Input from '../components/form/Input';
import { useNavigate } from 'react-router-dom';

function VisitorPage() {
    const [email, setEmail] = useState('');
    const [seeing, setSeeing] = useState('');
    const navigate = useNavigate();

    const isButtonDisabled = email === '' || seeing === '';

    const handleSubmit = (e) => {
        e.preventDefault();
        const mockDatabase = [
            { email: 'nikhil.sengupta@gmail.com', seeing: 'fatma' },
        ];

        const user = mockDatabase.find(
            u => u.email === email && u.seeing === seeing
        );

        if (user) {
            navigate('/admin/login-success');
        }
    };

    return (
        <div className="flex h-full w-full flex-col bg-white text-sladeOrange items-center justify-center">
            <div>
                <h1 className="text-3xl font-galindo font-bold text-center mb-10">
                    Visitor Login / Logout
                </h1>
            </div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center w-full max-w-lg bg-white"
            >
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-4 w-full"
                />
                <Input
                    id="seeing"
                    label="Who are you here to see?"
                    value={seeing}
                    onChange={(e) => setSeeing(e.target.value)}
                    required
                    className="mb-4 w-full"
                />
                <Button
                    type="submit"
                    buttonColor="bg-sladeGreen"
                    onClick={handleSubmit}
                    placeholderText="OK"
                    disabled={isButtonDisabled}
                    className={`w-full ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-sladeGreen-dark'} text-white text-xl mt-6`}
                />
            </form>
        </div>
    );
}

export default VisitorPage;
