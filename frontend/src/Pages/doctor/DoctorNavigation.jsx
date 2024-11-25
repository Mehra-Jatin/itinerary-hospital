import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

function DoctorNavigation() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/doctor-dashboard');
    };

    return (
        <div className="">
            <div className="relative text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-orange-500 opacity-50 mix-blend-multiply"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <div className="text-center animate-fade-in-down">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Go To Your <span className="text-orange-900">Dashboard</span>
                        </h1>
                    </div>
                    <div className="mt-10 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <button onClick={handleRedirect} className="inline-flex  items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-orange-700 bg-white hover:bg-orange-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            <span className='text-xl italic font-bold'>DashBoard</span> <ExternalLink className='ml-2' size={25} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoctorNavigation