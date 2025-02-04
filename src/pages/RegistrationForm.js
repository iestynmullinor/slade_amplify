import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';


function RegistrationForm({userPool}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [postcode, setPostcode] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRequirementsMessage, setPasswordRequirementsMessage] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // ---------------------------- FOR GUARDIAN REGISTRATION ----------------------------

    const [children, setChildren] = useState([{ firstName: "", lastName: "", gender: "", ethnicity: "", dob: "", school: "", allergies: "", specialNeeds: "" }]);
    const [permissions, setPermissions] = useState({ photos: "", emails: "", terms: "" });
    const [howHeard, setHowHeard] = useState("");


    const handleChildChange = (index, field, value) => {
        const updatedChildren = [...children];
        updatedChildren[index][field] = value;
        setChildren(updatedChildren);
    };

    const addChild = () => {
        setChildren([...children, { firstName: "", lastName: "", gender: "", ethnicity: "", dob: "", school: "", allergies: "", specialNeeds: "" }]);
    };

    const removeChild = (index) => {
        const updatedChildren = children.filter((_, i) => i !== index);
        setChildren(updatedChildren);
    };

    // --------------------------------------------------------------------------------

    const handlePasswordRequirements = (e) => {
        setPassword(e.target.value);

        const newMessages = [];

        const value = e.target.value;

        if (value.length < 8) {
        newMessages.push("Password must be at least 8 characters long.");
        }

        if (!/(?=.*\d)/.test(value)) {
        newMessages.push("Password must contain at least one number.");
        }

        if (!/(?=.*[!@#$%^&*(),.?":{}_|<>])/.test(value)) {
        newMessages.push("Password must contain at least one special character.");
        }

        if (!/(?=.*[A-Z])/.test(value)) {
        newMessages.push("Password must contain at least one uppercase letter.");
        }

        if (!/(?=.*[a-z])/.test(value)) {
        newMessages.push("Password must contain at least one lowercase letter.");
        }

        setPasswordRequirementsMessage(newMessages);

    }

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);

        if (password !== e.target.value) {
            setPasswordErrorMessage("Passwords do not match");
        } else {
            setPasswordErrorMessage("");
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }


        const newUser = { firstName, lastName, email, dob, addressLine1, addressLine2, city, postcode };
        console.log('New User Registered:', newUser);

        // these are potential values that can be used to update the DynamoDB
        const fullName = `${firstName} ${lastName}`;
        const fullAddress = `${addressLine1}, ${addressLine2}, ${city}, ${postcode}`;



        // Cognito attribute list
        const attributeList = [];


        // Add role attribute
        const dataRole = { Name: 'custom:role', Value: role.toLowerCase() };
        const attributeRole = new CognitoUserAttribute(dataRole);
        attributeList.push(attributeRole);


         // Sign up the user with email and password
        userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
            setError(err.message || JSON.stringify(err));
            return;
        }

        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // LOGIC TO UPADATE DYNAMODB GOES HERE////////////////////////////
        //////////////////////////////////////////////////////////////////
        //////////////////////////////////////////////////////////////////

        localStorage.setItem('emailToConfirm', email);
        navigate('/confirm-email');
    });
    };

    return (
        <div className="py-10 bg-white p-10 rounded-lg shadow-md w-full max-w-4xl mx-auto">
            {/* Title and Disclaimer Text */}
            <h2 className="text-3xl font-semibold text-center text-[#222831] mb-4">
                Register
            </h2>
            <p className="text-sm text-center text-[#6FB545] mb-6">
                Please note: Slade Gardens Adventure Playground is not a childcare facility.
            </p>


            {/* Registration Form */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4 flex space-x-6">
                    <div className="flex-1">
                        <label htmlFor="firstName" className="block text-[#222831] font-medium">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="block text-[#222831] font-medium">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-[#222831] font-medium">
                        Email Address:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="dob" className="block text-[#222831] font-medium">
                        Date of Birth:
                    </label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                        required
                    />
                </div>
                

                {/* Address Fields */}
                <div className="mb-4">
                    <label htmlFor="addressLine1" className="block text-[#222831] font-medium">
                        Address Line 1:
                    </label>
                    <input
                        type="text"
                        id="addressLine1"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="addressLine2" className="block text-[#222831] font-medium">
                        Address Line 2:
                    </label>
                    <input
                        type="text"
                        id="addressLine2"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                    />
                </div>
                <div className="mb-4 flex space-x-6">
                    <div className="flex-1">
                        <label htmlFor="city" className="block text-[#222831] font-medium">
                            City:
                        </label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="postcode" className="block text-[#222831] font-medium">
                            Postcode:
                        </label>
                        <input
                            type="text"
                            id="postcode"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                            required
                        />
                    </div>
                </div>
                {/*Password Fields */}
                
                <div className="mb-4">
                    <label htmlFor="password" className="block text-[#222831] font-medium">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordRequirements}
                        className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                        required
                    />
                </div>
                <div className="mt-4">
                    {passwordRequirementsMessage.length > 0 && (
                        <div className="bg-red-50 border border-red-500 text-red-700 p-4 rounded-lg">
                        <ul className="list-disc list-inside">
                            {passwordRequirementsMessage.map((msg, index) => (
                            <li key={index}>{msg}</li>
                            ))}
                        </ul>
                        </div>
                    )}
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-[#222831] font-medium">
                        Confirm Password:
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPassword}
                        className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                        required
                    />
                </div>
                <div className="mt-4">
                    {passwordErrorMessage && (
                        <div className="bg-red-50 border border-red-500 text-red-700 p-4 rounded-lg">
                        <ul className="list-disc list-inside">
                            <li>{passwordErrorMessage}</li>
                        </ul>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="role" className="block text-[#222831] font-medium">
                        Select Role:
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 mt-2 border border-[#6FB545] rounded-md focus:outline-none focus:ring-2 focus:ring-[#F9DE3F]"
                        required
                    >
                        <option value="">-- Select Role --</option>
                        <option value="guardian">Guardian</option>
                        <option value="volunteer">Volunteer</option>
                    </select>
                </div>

                {/* Additional Fields for Guardian Registration */}
                {role === 'guardian' && (
                
                <>
                {children.map((child, index) => (
                    <div key={index} className="mb-6 border-t border-gray-300 pt-4">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">
                            Child {index + 1}
                            {children.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeChild(index)}
                                    className="ml-4 text-red-500 text-sm hover:underline"
                                >
                                    Remove
                                </button>
                            )}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name*"
                                value={child.firstName}
                                onChange={(e) => handleChildChange(index, "firstName", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name*"
                                value={child.lastName}
                                onChange={(e) => handleChildChange(index, "lastName", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <select
                                value={child.gender}
                                onChange={(e) => handleChildChange(index, "gender", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Gender*</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <select
                                value={child.ethnicity}
                                onChange={(e) => handleChildChange(index, "ethnicity", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                                required
                            >
                                <option value="">Ethnicity*</option>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                                <option value="asian">Asian</option>
                                <option value="mixed">Mixed</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="date"
                                placeholder="Date of Birth*"
                                value={child.dob}
                                onChange={(e) => handleChildChange(index, "dob", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="School*"
                                value={child.school}
                                onChange={(e) => handleChildChange(index, "school", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Any Allergies?"
                                value={child.allergies}
                                onChange={(e) => handleChildChange(index, "allergies", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Disabilities / Special Needs?"
                                value={child.specialNeeds}
                                onChange={(e) => handleChildChange(index, "specialNeeds", e.target.value)}
                                className="p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addChild}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
                >
                    + Add Child
                </button>
                {/* Permissions */}
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Permissions</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Do we have your permission for your child's photographs/videos to be used on our social media or marketing?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="photos"
                                    value="yes"
                                    checked={permissions.photos === "yes"}
                                    onChange={(e) => setPermissions({ ...permissions, photos: e.target.value })}
                                />{" "}
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="photos"
                                    value="no"
                                    checked={permissions.photos === "no"}
                                    onChange={(e) => setPermissions({ ...permissions, photos: e.target.value })}
                                />{" "}
                                No
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            May we occasionally email you with news and notices of our community events?
                        </label>
                        <div className="flex items-center space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="emails"
                                    value="yes"
                                    checked={permissions.emails === "yes"}
                                    onChange={(e) => setPermissions({ ...permissions, emails: e.target.value })}
                                />{" "}
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="emails"
                                    value="no"
                                    checked={permissions.emails === "no"}
                                    onChange={(e) => setPermissions({ ...permissions, emails: e.target.value })}
                                />{" "}
                                No
                            </label>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">
                            Do you agree to the <a href="#" className="text-blue-500 hover:underline">terms and conditions?</a>
                        </label>
                        <div className="flex items-center space-x-4">
                            <label>
                                <input
                                    type="radio"
                                    name="terms"
                                    value="yes"
                                    checked={permissions.terms === "yes"}
                                    onChange={(e) => setPermissions({ ...permissions, terms: e.target.value })}
                                />{" "}
                                Yes
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="terms"
                                    value="no"
                                    checked={permissions.terms === "no"}
                                    onChange={(e) => setPermissions({ ...permissions, terms: e.target.value })}
                                />{" "}
                                No
                            </label>
                        </div>
                    </div>
                </div>

                {/* How did you hear */}
                <div className="mb-6">
                    <label htmlFor="howHeard" className="block text-gray-700">
                        How did you hear about Slade Gardens?
                    </label>
                    <input
                        type="text"
                        id="howHeard"
                        value={howHeard}
                        onChange={(e) => setHowHeard(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>   
            </>
            )}

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-[#6FB545] text-white rounded-md hover:bg-[#078543] focus:outline-none"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;
