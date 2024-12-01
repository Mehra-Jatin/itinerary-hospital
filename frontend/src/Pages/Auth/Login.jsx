import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isUnverifiedDoctor, setIsUnverifiedDoctor] = useState(false);
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
        setError(''); // Clear any previous errors

        try {
            const result = await login(formData.email, formData.password);

            console.log('Result:', result);
            

            // Check if login was successful
            if (result.success) {
                const user = result.user;
                // console.log('User Role:', user.role, 'Validated:', user.isValidated);

                if (user.role === 'doctor') {
                    if (!user.isValidated) {
                        // console.log('Doctor is not validated, showing toast.');
                        setIsUnverifiedDoctor(true);
                        return;
                    } else {
                        // console.log('Redirecting to doctor profile.');
                        navigate('/doctor-profile');
                    }
                } else if (user.role === 'patient') {
                    // console.log('Redirecting to patient profile.');
                    navigate('/profile');
                } else if (user.role === 'admin') {
                    // console.log('Redirecting to admin dashboard.');
                    navigate('/admin-dashboard');
                }

            } else {
                // Handle login failure
                setError(result.message || 'Login failed');
            }
        } catch (error) {
            // Handle any unexpected errors
            setError('An unexpected error occurred');
            console.error(error);
        }
    };

    const closeUnverifiedModal = () => {
        console.log('Closing Toast');
        setIsUnverifiedDoctor(false);
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
                                        <Mail className="h-5 w-5 text-gray-400" />
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
                                        <Lock className="h-5 w-5 text-gray-400" />
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
                                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 transition-colors">
                            Sign In
                        </Button>
                    </form>
                </div>

                {/* Unverified Doctor Toast */}
                <Dialog open={isUnverifiedDoctor} onOpenChange={closeUnverifiedModal}>
                    <DialogContent className="max-w-md rounded-xl shadow-2xl">
                        <div className="flex flex-col items-center space-y-6 p-6">
                            <div className="bg-orange-100 p-4 rounded-full">
                                <CheckCircle className="text-orange-600 w-16 h-16" />
                            </div>
                            <div className="text-center space-y-3">
                                <DialogTitle className="text-2xl font-bold text-gray-900">
                                    Verification Pending
                                </DialogTitle>
                                <DialogDescription className="text-gray-600 text-base">
                                    Your doctor account is currently under review by our admin team.
                                    We'll notify you via email once your account is verified.
                                </DialogDescription>
                            </div>
                            <div className="flex space-x-4 w-full">
                                <Button
                                    onClick={closeUnverifiedModal}
                                    className="w-full bg-orange-600 hover:bg-orange-700 transition-colors"
                                >
                                    Understood
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
    );
}