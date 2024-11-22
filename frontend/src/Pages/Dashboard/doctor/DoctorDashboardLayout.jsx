import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Bell, HelpCircle, Settings,HamIcon, Menu, Camera, LayoutDashboardIcon, CalendarCheck, User, MessageSquareText, History, Users, DollarSign, Calendar, Heart } from 'lucide-react';
import { FaHamburger } from 'react-icons/fa';
import NextPatient from '@/components/NextPatient';
import ChatBox from '@/components/ChatBox';

function DoctorDashboardLayout() {
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
     

    {/* Key Metrics */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <Card>
        <div className="flex justify-center items-center h-28 w-full ">
          <div className="w-2/5 flex justify-center">
            <Users className="text-violet-600 bg-gray-300 p-2 w-8 h-8 rounded-md" />
          </div>
          <div className="w-3/5 text-center">
            <p>Patients</p>
            <p>666</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex justify-center items-center h-28 w-full ">
          <div className="w-2/5 flex justify-center">
            <DollarSign className="text-blue-500 bg-sky-100 p-2 w-8 h-8 rounded-md" />
          </div>
          <div className="w-3/5 text-center">
            <p>Income</p>
            <p>$1,200</p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex justify-center items-center h-28 w-full ">
          <div className="w-2/5 flex justify-center">
            <Calendar className="text-green-300 bg-green-100 p-2 w-8 h-8 rounded-md" />
          </div>
          <div className="w-3/5 text-center">
            <p>Appointments</p>
            <p>211</p>
          </div>
        </div>
      </Card>
      <Card>
        <div className="flex justify-center items-center h-28 w-full ">
          <div className="w-2/5 flex justify-center">
            <Heart className="text-red-500 p-2 w-8 h-8 rounded-md bg-red-100" />
          </div>
          <div className="w-3/5 text-center">
            <p>Treatments</p>
            <p>400</p>
          </div>
        </div>
      </Card>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-4 w-full">
  {/* Today's Appointments */}
  <Card className="shadow-slate-400 h-screen overflow-auto">
    <h2 className="text-xl font-semibold mb-8 text-center ">Today's Appointments</h2>
    <div className="grid grid-cols-1  gap-3 ">
      <div className='flex justify-between  bg-blue-100  py-3 mx-2 rounded'>
        <div className='flex gap-5 mx-2'>
          <div> <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='object-cover w-12 h-12 rounded-full'/> </div>
          <div>
            <p>Rudra</p>
            <p>Scoing</p>
          </div>
        </div>
        <div className='mx-2 text-center'>On Going</div>
      </div>
      <div className='flex justify-between mb-5 mx-2 rounded'>
        <div className='flex gap-5 mx-2'>
          <div> <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='object-cover w-12 h-12 rounded-full'/> </div>
          <div>
            <p>Rudra</p>
            <p>Scoing</p>
          </div>
        </div>
        <div className='mx-2'>12:00</div>
      </div>
      
    </div>
  </Card>

  {/* Appointment Requests */}
  <Card className='w-full justify-center flex shadow-slate-400'>
 <NextPatient /></Card>
</div>
  <ChatBox />
    </>
  );
}

export default DoctorDashboardLayout;
