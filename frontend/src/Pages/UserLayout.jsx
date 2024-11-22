import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserNavbar from "./user/components/UserNavbar";
import { AppointmentProvider } from "@/contexts/AppointmentContext";
import { PatientProvider } from "@/contexts/PatientContext";


const UserLayout = () => {
    return (
        <AppointmentProvider>
            <PatientProvider>
                <div>
                    <Navbar />
                    <div className='mt-5 mb-16'>
                        <UserNavbar />
                        <div className="mt-4 md:mx-24">
                            <Outlet />
                        </div>
                    </div>
                    <Footer />
                </div>
            </PatientProvider>
        </AppointmentProvider>
    );
}

export default UserLayout;