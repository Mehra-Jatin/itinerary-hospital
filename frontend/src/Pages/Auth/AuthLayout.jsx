import { NavLink, Outlet, useNavigate } from "react-router-dom";
import logoImg from "../../components/Images/logo-header.png";
import { FaArrowLeft } from "react-icons/fa";

const AuthLayout = () => {

    const navigate = useNavigate();
    const goBack = () => navigate(-1);


    return (
        <div>
            
            <button onClick={goBack} className='absolute top-4 left-4 flex items-center space-x-2 hover:bg-orange-400 hover:text-white text-gray-400 italic rounded-md px-5 py-2 '>
                <FaArrowLeft className='w-3 h-3' />
                <span>Back</span>
            </button>


            <Outlet />


            <div className="flex items-center justify-between px-10 pb-2 border-t">
                <NavLink to="/" className="flex items-center space-x-2">
                    <img src={logoImg} alt="Televets Logo" className="w-36" />
                </NavLink>

                <div>
                    <p className="text-xs text-gray-500">© 2024 Televets. All rights reserved.</p>
                </div>

                <div className="flex items-center space-x-2 text-xs ">
                    <h1 className="hover:text-gray-700 text-gray-500 cursor-pointer">Privacy Policy</h1>
                    <h1 className="hover:text-gray-700 text-gray-500 cursor-pointer">Terms & Conditions</h1>
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;