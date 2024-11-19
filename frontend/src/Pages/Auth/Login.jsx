import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let userRole;
        if (formData.email.includes('admin')) {
            userRole = 'admin';
        } else if (formData.email.includes('doctor')) {
            userRole = 'doctor';
        } else {
            userRole = 'patient';
        }

        if (userRole === 'admin') {
            navigate('/dashboard&admin');
        } else if (userRole === 'doctor') {
            navigate('/dashboard&doctor');
        } else {
            navigate('/profile');
        }
    };

    const goBack = () => navigate(-1);

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
                            Welcome Back!
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Don't have an account?
                            {' '}
                            <button
                                onClick={() => navigate('/auth/register')}
                                className="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
                            >
                                Sign up
                            </button>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <div className="space-y-4">
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
                                        className="block w-full pl-10 pr-3 py-2 rounded-md border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        placeholder="you@example.com"
                                        onChange={handleInputChange}
                                    />
                                </div>
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
                                        className="block w-full pl-10 pr-10 py-2 rounded-md border-gray-300 focus:ring-orange-500 focus:border-orange-500 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        placeholder="********"
                                        onChange={handleInputChange}
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-150 ease-in-out"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}