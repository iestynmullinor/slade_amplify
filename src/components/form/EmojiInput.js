import React, { useState } from 'react';
import Input from './Input';

function EmojiInput() {
    const [values, setValues] = useState(['', '', '']);

    const handleChange = (index, newValue) => {
        const newValues = [...values];
        newValues[index] = newValue;
        setValues(newValues);
    };

    return (
        <div className="flex justify-evenly">
            {values.map((value, index) => (
                <Input
                    key={index}
                    id={`emoji-input-${index}`}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    required={true}
                    className="w-14 h-14 text-center border-gray-400 rounded-lg focus:ring-yellow-500"
                />
            ))}
        </div>
    );
}

export default EmojiInput;
