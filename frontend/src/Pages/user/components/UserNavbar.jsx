import React from 'react';
import { MdOutlineAccountCircle, MdOutlinePayments } from "react-icons/md";
import { CiMedicalClipboard, CiMedicalCross } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";


import { NavLink } from 'react-router-dom';

function UserNavbar() {
    return (
        <div>
            <ul className=' flex justify-between max-w-3xl items-center mx-auto mt-2'>
                <NavLink 
                    to="/profile" 
                    end
                    className={({ isActive }) => 
                        isActive ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900 '
                    }
                >
                    <li className='flex gap-2 group px-2 py-1 transition duration-200 cursor-pointer hover:bg-orange-200 rounded-md'>
                        <MdOutlineAccountCircle className='text-xl ' />
                        <span>My Profile</span>
                    </li>
                </NavLink>

                <NavLink 
                    to="/profile/appointements"
                    className={({ isActive }) => 
                        isActive ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'
                    }
                >
                    <li className='flex gap-2 group px-2 py-1 transition duration-200 cursor-pointer hover:bg-orange-200 rounded-md'>
                        <CiMedicalClipboard className='text-xl ' />
                        <span>My Appointments</span>
                    </li>
                </NavLink>

                <NavLink 
                    to="/profile/reports"
                    className={({ isActive }) => 
                        isActive ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'
                    }
                >
                    <li className='flex gap-2 group px-2 py-1 transition duration-200 cursor-pointer hover:bg-orange-200 rounded-md'>
                        <CiMedicalCross className='text-xl ' />
                        <span>Medical Reports</span>
                    </li>
                </NavLink>

                <NavLink 
                    to="/profile/paymentrecords"
                    className={({ isActive }) => 
                        isActive ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'
                    }
                >
                    <li className='flex gap-2 group px-2 py-1 transition duration-200 cursor-pointer hover:bg-orange-200 rounded-md'>
                        <MdOutlinePayments className='text-xl ' />
                        <span>Payments Records</span>
                    </li>
                </NavLink>

                <NavLink 
                    to="/profile/settings"
                    className={({ isActive }) => 
                        isActive ? 'text-gray-900 border-b-2 border-orange-500' : 'text-gray-500 hover:text-gray-900'
                    }
                >
                    <li className='flex gap-2 group px-2 py-1 transition duration-200 cursor-pointer hover:bg-orange-200 rounded-md'>
                        <IoSettingsOutline className='text-xl ' />
                        <span>Setting</span>
                    </li>
                </NavLink>
            </ul>
        </div>
    );
}

export default UserNavbar;
