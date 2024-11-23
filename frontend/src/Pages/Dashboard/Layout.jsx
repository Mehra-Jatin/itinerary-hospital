import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Bell, HelpCircle, Settings,HamIcon, Menu, Camera, LayoutDashboardIcon, CalendarCheck, User, MessageSquareText, History, Users, DollarSign, Calendar, Heart } from 'lucide-react';
import { FaHamburger } from 'react-icons/fa';
import DoctorDashboardLayout from './doctor/DoctorDashboardLayout';
import DashContent from './doctor/DashContent';

function DashboardLayout({role}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleResize = () => {
    setIsMobile(window.matchMedia('(max-width: 480px)').matches);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* <h1 className="text-2xl font-bold text-center">Dashboard</h1> */}
      <div className="flex w-full">
  {/* Sidebar */}
  <aside
  className={`fixed shadow-2xl shadow-black   top-0 left-0  z-50 transform transition-transform ${
    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
  } lg:translate-x-0 lg:relative lg:w-52 w-44 bg-blue-500 min-h-screen overflow-auto`  }
>
    {/* Profile Section */}
   {role ==='doctor' ?<DashContent /> :""}
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
          <Button variant="primary">
            {isMobile ? <Bell /> : <> <Bell /> Alert </>}
          </Button>
        </div>
        <div>
          <Button variant="primary">
            {isMobile ? <HelpCircle /> : <> <HelpCircle /> Help </>}
          </Button>
        </div>
        <div>
          <Button variant="primary">
            {isMobile ? <Settings /> : <> <Settings /> Setting </>}
          </Button>
        </div>
      </div>
    </div>
  {role==='doctor'? <DoctorDashboardLayout /> :""}
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
