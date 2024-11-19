import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import UserNavbar from "./user/components/UserNavbar";

const User = () => {
    return (
        <div>
            <Navbar />
            <div className='mt-5 mb-16'>
                <UserNavbar />
                <div className="mt-4 mx-24">
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default User;