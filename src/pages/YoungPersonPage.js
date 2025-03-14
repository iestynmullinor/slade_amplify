import React, { useState } from 'react';
import EmojiButtonGrid from '../components/ui/EmojiButtonGrid';
import Button from '../components/form/Button';
import { Link } from 'react-router-dom';
import BackButton from '../components/form/BackButton';
import { useNavigate } from 'react-router-dom';

function YoungPersonPage() {
    const [inputs, setInputs] = useState(['', '', '']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleEmojiClick = (emoji) => {
        if (currentIndex < 3) {
            const newInputs = [...inputs];
            newInputs[currentIndex] = emoji;
            setInputs(newInputs);
            setCurrentIndex(currentIndex + 1);
        }
    }

    const handleBackOnClick = () => {
        if (currentIndex > 0) {
            const newInputs = [...inputs];
            newInputs[currentIndex - 1] = '';
            setInputs(newInputs);
            setCurrentIndex(currentIndex - 1);
        }

        if (error) {
            setError("")
        }
    }

    const isButtonDisabled = inputs.some(input => input === '');

    const handleSubmit = (e) => {
        e.preventDefault();

        const password = inputs.join('');
        const mockDatabase = [
            { firstName: 'Nikhil', lastName: 'Sengupta', password: '🍺🍺🍺' },
        ];

        const user = mockDatabase.find(
            u => u.password === password
        );

        if (user) {
            navigate('/admin/young-person-confirm', { state: { firstName: user.firstName, lastName: user.lastName } });
        } else {
            setError('Oh no! We cannot find you!');
        }
    };


    return (
        <div className="flex h-full flex-col bg-white flex-grow text-sladeOrange items-center justify-center">
            <div>
                <h1 className="text-3xl font-galindo font-bold text-center">Adventure Playground</h1>
                <h1 className="text-3xl font-galindo font-bold text-center">Login / Logout</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mt-10">
                    <div className="flex space-x-4 justify-center items-center">
                        {inputs.map((input, index) => (
                            <div
                                key={index}
                                className="w-16 h-16 border border-gray-400 flex items-center justify-center bg-white text-2xl rounded"
                            >
                                {input}
                            </div>
                        ))}
                        <BackButton buttonColor="bg-sladeRed" onClick={handleBackOnClick} />
                    </div>
                    {error && <p className="text-red-500 text-center font-semibold font-monserrat mt-4">{error}</p>}
                </div>
                <div className="mt-6">
                    <EmojiButtonGrid onEmojiClick={handleEmojiClick} />
                </div>
                <Button type="submit" buttonColor="bg-sladeGreen" placeholderText="OK" disabled={isButtonDisabled} className={`${isButtonDisabled ? '' : "hover:bg-sladeGreen-dark"} w-full text-white text-xl mt-10`} />
            </form>
            <Link to="/privacy-policy" className="text-gray-700 font-monserrat underline underline-offset-1 hover:text-gray-900 mt-5">
                Log in with your name instead
            </Link>.
        </div>
    );
}

export default YoungPersonPage;
