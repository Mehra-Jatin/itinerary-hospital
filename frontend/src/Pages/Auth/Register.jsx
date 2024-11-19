import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope, FaUserMd, FaUserInjured, FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [registrationStep, setRegistrationStep] = useState(1);
    const [role, setRole] = useState('patient');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        dateOfBirth: '',
        gender: '',
        phoneNumber: '',
        address: '',
        specialization: '',
        experience: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
        if (!/^\d+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must contain only digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (registrationStep === 1 && validateStep1()) {
            setRegistrationStep(2);
        }
    };

    const handleBack = () => {
        setRegistrationStep(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (registrationStep === 2 && validateStep2()) {
            console.log('Registration submitted:', formData);
            alert('Registration successful! Please log in.');
            navigate('/login');
        }
    };

    const goBack = () => navigate(-1);

    const renderAuthOptions = () => (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Choose Your Role</h2>
            <div className="flex justify-center space-x-4">
                {['patient', 'doctor'].map((option) => (
                    <button
                        key={option}
                        type="button"
                        onClick={() => setRole(option)}
                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all duration-300 ${role === option
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                            : 'bg-white text-gray-800 hover:bg-orange-50 hover:shadow-md'
                            } shadow w-32 h-32 border border-gray-200`}
                    >
                        {option === 'patient' ? <FaUserInjured className="text-3xl mb-2" /> : <FaUserMd className="text-3xl mb-2" />}
                        <span className="capitalize text-lg">{option}</span>
                    </button>
                ))}
            </div>
        </div>
    );

    const renderRegistrationStep1 = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            className={`block w-full pl-10 pr-3 py-2 rounded-md ${errors.firstName ? 'border-red-300' : 'border-gray-300'} focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                            placeholder="First Name"
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            placeholder="Last Name"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className={`block w-full pl-10 pr-3 py-2 rounded-md ${errors.email ? 'border-red-300' : 'border-gray-300'} focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        placeholder="you@example.com"
                        onChange={handleInputChange}
                    />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        className={`block w-full pl-10 pr-10 py-2 rounded-md ${errors.password ? 'border-red-300' : 'border-gray-300'} focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        placeholder="********"
                        onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> :
                            <FaEye className="h-5 w-5 text-gray-400" />
                        }
                    </div>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className={`block w-full pl-10 pr-3 py-2 rounded-md ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        placeholder="********"
                        onChange={handleInputChange}
                    />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>
        </div>
    );

    const renderRegistrationStep2 = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        required
                        className={`block w-full px-3 py-2 rounded-md ${errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'} focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                        onChange={handleInputChange}
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                </div>
                <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        className="block w-full px-3 py-2 rounded-md border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        onChange={handleInputChange}
                    >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
            <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    className={`block w-full px-3 py-2 rounded-md ${errors.phoneNumber ? 'border-red-300' : 'border-gray-300'} focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5`}
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
            </div>
            {role === 'patient' && (
                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        rows="3"
                        className="block w-full px-3 py-2 rounded-md border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                        placeholder="Your address"
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            )}
            {role === 'doctor' && (
                <>
                    <div>
                        <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                        <input
                            id="specialization"
                            name="specialization"
                            type="text"
                            className="block w-full px-3 py-2 rounded-md border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            placeholder="Your specialization"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                        <input
                            id="experience"
                            name="experience"
                            type="number"
                            className="block w-full px-3 py-2 rounded-md border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                            placeholder="Years of experience"
                            onChange={handleInputChange}
                        />
                    </div>
                </>
            )}
        </div>
    );

    return (
        <>
            <button onClick={goBack} className='absolute top-4 left-4 flex items-center space-x-2 hover:bg-orange-100 rounded-full p-2'>
                <FaArrowLeft className='w-3 h-3' />
                <span>Back</span>
            </button>
            <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create Your Account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?
                            {' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>
                    <div className="flex items-center justify-center mb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${registrationStep === 1 ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-600'}`}>1</div>
                        <div className={`h-1 w-16 ${registrationStep === 2 ? 'bg-orange-600' : 'bg-orange-100'}`}></div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${registrationStep === 2 ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-600'}`}>2</div>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {registrationStep === 1 && (
                            <>
                                {renderAuthOptions()}
                                {renderRegistrationStep1()}
                            </>
                        )}
                        {registrationStep === 2 && renderRegistrationStep2()}
                        <div className="flex justify-between space-x-4">
                            {registrationStep === 2 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                >
                                    <FaArrowLeft className="mr-2" /> Back
                                </button>
                            )}
                            <button
                                type={registrationStep === 2 ? 'submit' : 'button'}
                                onClick={registrationStep === 1 ? handleNext : undefined}
                                className={`${registrationStep === 1 ? 'flex-1' : 'w-full'} inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out`}
                            >
                                {registrationStep === 1 ? 'Next' : 'Complete Registration'}
                                {registrationStep === 1 && <FaArrowRight className="ml-2" />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}