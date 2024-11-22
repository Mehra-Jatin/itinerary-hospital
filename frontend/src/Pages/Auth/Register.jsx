import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaUser, FaLock, FaEnvelope, FaUserMd, FaUserInjured, FaEye, FaEyeSlash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import DoctorApprovalWaiting from '../../components/DoctorApprovalWaiting';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { set } from 'date-fns';

export default function Register() {
    const [registrationStep, setRegistrationStep] = useState(1);
    const [role, setRole] = useState('patient');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        // dateOfBirth: '',
        gender: '',
        PhoneNo: '',
        address: '',
        specialization: '',
        experience: ''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState('');
    const [isNewDoctor, setIsNewDoctor] = useState(false);
    const { register } = useAuth();
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
        if (!formData.FirstName) newErrors.FirstName = 'First name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        // if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.PhoneNo) newErrors.PhoneNo = 'Phone number is required';
        if (!/^\d+$/.test(formData.PhoneNo)) {
            newErrors.PhoneNo = 'Phone number must contain only digits';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registrationStep === 2 && validateStep2()) {
            try {
                const registrationData = {
                    ...formData,
                    role  // Add this line to include role
                };
                const result = await register(registrationData);
                
                if (result.success) {
                    if (role === 'doctor') {
                        setIsNewDoctor(true);
                    } else {
                        navigate('/auth/login');
                    }
                } else {
                    // More specific error handling
                    const errorMessage = result.message || 'Registration failed';
                    if (errorMessage.includes('email already exists')) {
                        setError('This email is already registered. Please login instead.');
                    } else {
                        setError(errorMessage);
                    }
                }
            } catch (error) {
                // Catch any unexpected errors
                console.error('Registration error:', error);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };
    // backend api call

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
            {/* {User.status === 'pending' && ""} */}
        </div>
    );

    const renderRegistrationStep1 = () => (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="FirstName">First Name</Label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            id="FirstName"
                            name="FirstName"
                            type="text"
                            required
                            className="pl-10"
                            placeholder="First Name"
                            onChange={handleInputChange}
                        />
                    </div>
                    {errors.FirstName && <p className="mt-1 text-sm text-red-600">{errors.FirstName}</p>}
                </div>
                <div>
                    <Label htmlFor="LastName">Last Name</Label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <Input
                            id="LastName"
                            name="LastName"
                            type="text"
                            className="pl-10"
                            placeholder="Last Name"
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
            </div>
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
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>
            <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        required
                        className="pl-10"
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
                {/* <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        required
                        onChange={handleInputChange}
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
                </div> */}
                <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select name="gender" onValueChange={(value) => handleInputChange({ target: { name: 'gender', value } })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div>
                <Label htmlFor="PhoneNo">Phone Number</Label>
                <Input
                    id="PhoneNo"
                    name="PhoneNo"
                    type="tel"
                    required
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                />
                {errors.PhoneNo && <p className="mt-1 text-sm text-red-600">{errors.PhoneNo}</p>}
            </div>
            {role === 'patient' && (
                <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                        id="address"
                        name="address"
                        placeholder="Your address"
                        onChange={handleInputChange}
                    />
                </div>
            )}
            {role === 'doctor' && (
                <>
                    <div>
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                            id="specialization"
                            name="specialization"
                            type="text"
                            placeholder="Your specialization"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="experience">Years of Experience</Label>
                        <Input
                            id="experience"
                            name="experience"
                            type="number"
                            placeholder="Years of experience"
                            onChange={handleInputChange}
                        />
                    </div>
                </>
            )}
        </div>
    );

    if (isNewDoctor) {
        return <DoctorApprovalWaiting />;
    }

    return (
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
                            onClick={() => navigate('/auth/login')}
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
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
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
                            <Button
                                type="button"
                                onClick={handleBack}
                                variant="outline"
                                className="flex-1"
                            >
                                <FaArrowLeft className="mr-2" /> Back
                            </Button>
                        )}
                        <Button
                            type={registrationStep === 2 ? 'submit' : 'button'}
                            onClick={registrationStep === 1 ? handleNext : undefined}
                            className={`bg-orange-600 ${registrationStep === 1 ? 'flex-1' : 'w-full'}`}
                        >
                            {registrationStep === 1 ? 'Next' : 'Complete Registration'}
                            {registrationStep === 1 && <FaArrowRight className="ml-2" />}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}