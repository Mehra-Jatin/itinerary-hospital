import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from 'axios';
export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData.email, formData.password);
        console.log('Login Result:', result); // Add this line to log the result
        if (result.success) { // Check if success is true then goes to the each dashboard
            if (result.user.role === 'patient') {
                navigate('/profile');
            } else if (result.user.role === 'doctor') {
                navigate('/doctor-profile');
            } else if (result.user.role === 'admin') {
                navigate('/admin-dashboard');
            }
        } else {
            setError(result.message);
        }
    };


    return (
        <div className="h-[90vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Welcome Back!
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Don&apos;t have an account?
                        {' '}
                        <button
                            onClick={() => navigate('/auth/register')}
                            className="font-medium text-orange-600 hover:text-orange-500 transition duration-150 ease-in-out"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="pl-10"
                                    placeholder="you@example.com"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FaLock className="h-5 w-5 text-gray-400" />
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    className="pl-10 pr-10"
                                    placeholder="********"
                                    onChange={handleInputChange}
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-orange-600">
                        Sign In
                    </Button>
                </form>
            </div>
        </div>
    );
}