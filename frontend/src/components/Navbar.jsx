import React, { useState } from 'react';
import { FiUser, FiChevronDown, FiCalendar, FiSettings, FiLogOut } from 'react-icons/fi';
import { FaHamburger } from 'react-icons/fa';
import logoImg from '../components/Images/logo-header.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const auth = true;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = (menu) => {
    setHoveredMenu(menu);
  };

  const handleMouseLeave = () => {
    setHoveredMenu(null);
  };

  return (
    <nav className="flex font-paytone justify-between items-center p-2 bg-white shadow-lg relative z-50">
      <NavLink to="/home" className="flex items-center space-x-2">
        <img src={logoImg} alt="PawsCare Logo" className="w-48" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {["Home", "Pages", "Doctor", "Blog", "Shop", "Contacts"].map((menu) => (
          <div
            key={menu}
            className="relative flex items-center text-gray-700 font-extrabold font-paytone hover:text-orange-500 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(menu)}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink
              to={`/${menu.toLowerCase()}`}
              activeClassName="text-orange-500" // This will apply the active style
            >
              <span>{menu}</span>
            </NavLink>

            <FiChevronDown className="ml-1" />

            {hoveredMenu === menu && (
              <div
                className="absolute top-full mt-2 w-40 bg-white shadow-lg rounded-lg p-4 opacity-0 transform transition-all duration-300 ease-in-out scale-95 hover:scale-100 hover:opacity-100"
              >
                <ul className="space-y-2">
                  <li className="text-gray-600 hover:text-orange-500">Submenu 1</li>
                  <li className="text-gray-600 hover:text-orange-500">Submenu 2</li>
                  <li className="text-gray-600 hover:text-orange-500">Submenu 3</li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact Information */}
      {/* <div className="hidden md:flex items-center space-x-2 bg-brown-800 text-white px-6 py-4 rounded-lg">
        <span className="material-icons">phone</span>
        <span>+1 800 123 456 789</span>
      </div> */}

      <div className='px-10'>
        {auth ? (
          <div className="relative group">
            <button
              className="flex items-center text-gray-700 hover:text-orange-500 focus:outline-none"
              aria-label="User menu"
              aria-haspopup="true"
            >
              <span className='text-xs font-semibold italic mr-3'>Welcome, User</span>
              <FiUser className="w-6 h-6" />
              <FiChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out">
              <div className="py-1">
                <NavLink to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                  <FiUser className="inline-block mr-2" /> My Profile
                </NavLink>
                <NavLink to="/profile/appointements" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                  <FiCalendar className="inline-block mr-2" /> My Appointments
                </NavLink>
                <NavLink to="/profile/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500">
                  <FiSettings className="inline-block mr-2" /> Settings
                </NavLink>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {/* Add logout function here */ }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-orange-500"
                >
                  <FiLogOut className="inline-block mr-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          <NavLink to="/auth" className="inline-block">
            <button className="
        bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 sm:py-3 sm:px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-sm sm:text-base border-b-4 border-orange-700 hover:border-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 active:border-b-0 active:mt-0.5 whitespace-nowrap">
              Create an account
            </button>
          </NavLink>
        )}

      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-gray-700 focus:outline-none">
          <span className="material-icons"><FaHamburger /></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex flex-col items-center justify-center space-y-6 text-white text-xl">
          <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-white focus:outline-none">
            <span className="material-icons text-3xl">close</span>
          </button>
          {["Home", "Pages", "Doctor", "Blog", "Shop", "Contacts"].map((menu) => (
            <NavLink
              to={`/${menu.toLowerCase()}`}
              className="flex items-center hover:text-orange-500"
              key={menu}
              onClick={toggleMobileMenu} // Close menu on mobile item click
            >
              {menu}
              <FiChevronDown className="ml-2" />
            </NavLink>
          ))}



          {/* <div className="mt-6 flex items-center bg-orange-500 opacity-5 text-white px-4 py-2 rounded-lg">
            <span className="material-icons">phone</span>
            <span className="ml-2">+1 800 123 456 789</span>
          </div> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
