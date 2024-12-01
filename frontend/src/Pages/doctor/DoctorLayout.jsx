import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { DoctorProvider } from "@/contexts/DoctorContext";
import React from "react";
import { CiMedicalClipboard } from "react-icons/ci";
import { NavLink, Outlet } from "react-router-dom";



const DoctorLayout = () => {
    return (
        <>
            <DoctorProvider>
                <div>
                    <Navbar />
                    <div className='mt-5 mb-16'>
                        <ul className=' flex justify-evenly max-w-3xl items-center mx-auto mt-2'>
                            <NavLink
                                to="/doctor-profile"
                                className={({ isActive }) =>
                                    isActive ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'
                                }
                            >
                                <li className='flex gap-2 group px-2 py-1 transition duration-200 cursor-pointer hover:bg-orange-200 rounded-md'>
                                    <CiMedicalClipboard className='text-xl ' />
                                    <span>My Profile</span>
                                </li>
                            </NavLink>
                            <NavLink
                                to="/doctor-profile/doctor-navigation"
                                className={({ isActive }) =>
                                    isActive ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'
                                }
                            >
                                <li className='flex gap-2 group px-2 py-1 transition duration-200 cursor-pointer hover:bg-orange-200 rounded-md'>
                                    <CiMedicalClipboard className='text-xl ' />
                                    <span>Go to Dashboard</span>
                                </li>
                            </NavLink>
                        </ul>
                        <div className="mt-4 mx-24">
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </div>
            </DoctorProvider>
        </>
    );
}

export default DoctorLayout;