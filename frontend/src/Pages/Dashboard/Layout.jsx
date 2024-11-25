import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Bell, HelpCircle, Settings, Menu, LogOutIcon } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import DashContent from './doctor/DashContent';
import { AuthContext } from '@/contexts/AuthContext';
import SettingsModal from './doctor/Components/Settings';

function DashboardLayout({ role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    setIsMobile(window.matchMedia('(max-width: 480px)').matches);
  };

  const handelSettings =()=>{
    isSettingsOpen(true)

  }
  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { user, logout } = useContext(AuthContext);
  return (
    <>
      <div className="flex w-full">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 min-h-screen w-56 bg-blue-300 shadow-2xl transition-all duration-300 ease-in-out ${
            isSidebarOpen ? 'transform translate-x-0' : 'transform -translate-x-full'
          } lg:translate-x-0 lg:relative`}
        >
          {/* Profile Section */}
          {role === 'doctor' ? <DashContent /> : ''}
          <div className='text-center'>
            
            {user ? (
              <div onClick={logout} className='hover:bg-orange-700 hover:text-white py-2 px-1 rounded-md flex ml-6 cursor-pointer gap-4 top-0 relative hover:transition-all  ease-in-out delay-150 hover:scale-110 duration-300'>
                <button ><LogOutIcon /> </button>
                <p>Logout</p>
                </div>
            ) : (
                <p>Please log in to access the dashboard.</p>
            )}
        </div> 
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto w-full lg:w-78">
          {/* Top Bar */}
          <div className="flex justify-between items-center mb-6">
            {/* Hamburger Menu */}
            <button
              className="lg:hidden text-gray-600 text-2xl focus:outline-none"
              onClick={toggleSidebar}
            >
              <Menu />
            </button>

            {/* Top Bar Buttons */}
            <div className="flex space-x-4 justify-end w-full">
              <div>
                <Button variant="primary" className='hover:bg-orange-200 rounded-full hover:text-orange-500 transition ease-in-out delay-150 hover:-translate-y hover:scale-110 duration-200'>
                  {isMobile ? <Bell className='text-lg' /> : <> <Bell className='text-lg'/> Alert </>}
                </Button>
              </div>
              <div>
                <Button variant="primary" className='hover:bg-orange-200 rounded-full hover:text-orange-500 transition ease-in-out delay-150 hover:-translate-y hover:scale-110 duration-200'c>
                  {isMobile ? <HelpCircle className='text-lg'/> : <> <HelpCircle className='text-lg' /> Help </>}
                </Button>
              </div>
              <div>
                <Button variant="primary" className='hover:bg-orange-200 rounded-full hover:text-orange-500 transition ease-in-out delay-150 hover:-translate-y hover:scale-110 duration-200'>
                  {isMobile ? <Settings className='text-lg' /> : <> <Settings className='text-lg' onClick={()=> handelSettings()} /> Setting </>}
                </Button>
              </div>
            </div>
          </div>
          <Outlet />
        </main>

        {/* Overlay for Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}
      </div>
    </>
  );
}

export default DashboardLayout;
