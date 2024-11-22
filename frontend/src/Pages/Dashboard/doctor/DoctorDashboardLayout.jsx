import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Bell, HelpCircle, Settings,HamIcon, Menu, Camera, LayoutDashboardIcon, CalendarCheck, User, MessageSquareText, History, Users, DollarSign, Calendar, Heart } from 'lucide-react';
import { FaHamburger } from 'react-icons/fa';

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

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
  {/* Today's Appointments */}
  <Card className="p-4">
    <h2 className="text-xl font-semibold mb-8 text-center ">Today's Appointments</h2>
    <div className="grid grid-cols-1  gap-4">
      <div className='flex justify-between'>
        <div className='flex gap-5'>
          <div> <img src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className='object-cover w-12 h-12 rounded-full'/> </div>
          <div>
            <p>Rudra</p>
            <p>Scoing</p>
          </div>
        </div>
        <div>On Going</div>
      </div>
      <Card>
        <CardContent>
          <p>Jane Smith - 11:00 AM</p>
          <Button variant="outline" className="mt-2">
            Details
          </Button>
        </CardContent>
      </Card>
    </div>
  </Card>

  {/* Appointment Requests */}
  <Card className="p-4">
    <h2 className="text-xl font-semibold mb-4">Appointment Requests</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardContent>
          <p>Michael Johnson - Pending</p>
          <Button variant="secondary" className="mt-2">
            Approve
          </Button>
        </CardContent>
      </Card>
    </div>
  </Card>
</div>
    </>
  );
}

export default DoctorDashboardLayout;
