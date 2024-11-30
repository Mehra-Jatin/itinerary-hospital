import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Bell,
  CalendarCheck,
  History,
  LayoutDashboardIcon,
  LogOut,
  MessageSquareText,
  Settings,
  User,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SettingsModal from "./Settings"; // Import the modal

export default function DashContent() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const [isAppointmentsOpen, setAppointmentsOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false); // State for modal

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600">
        Please log in to view your profile
      </div>
    );
  }

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `p-2 rounded gap-3 cursor-pointer mb-2 flex transition-all duration-300 transform ${
      isActive
        ? "bg-orange-200 text-orange-600"
        : "hover:bg-orange-500 hover:text-white"
    }`;
  };

  return (
    
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <div className="overflow-auto flex-1 p-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8 mt-10">
          <img
            className="rounded-full w-24 h-24"
            src={user.Image}
            alt="Doctor Profile"
          />
          <h2 className="text-lg font-semibold">
            {user.FirstName} {user.LastName}
          </h2>
          <p className="text-sm text-gray-600">{user.specialization}</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col ml-4">
          <Link to="/doctor-dashboard">
            <li className={getLinkClass("/doctor-dashboard")}>
              <LayoutDashboardIcon />
              <div>Dashboard</div>
            </li>
          </Link>
          <Link to="/doctor-dashboard/schedules">
            <li className={getLinkClass("/doctor-dashboard/schedules")}>
              <CalendarCheck />
              <div>Schedule</div>
            </li>
          </Link>

          {/* Appointments with Collapse */}
          <li
            className="p-2 rounded gap-3 cursor-pointer mb-2 flex transition-all duration-300 transform hover:bg-orange-500 hover:text-white"
            onClick={() => setAppointmentsOpen(!isAppointmentsOpen)}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-3">
                <Users />
                <div>Appointments</div>
              </div>
              {isAppointmentsOpen ? <ChevronUp /> : <ChevronDown />}
            </div>
          </li>
          {isAppointmentsOpen && (
            <ul className="ml-8">
              <Link to="/doctor-dashboard/appointments/manage-appointments">
                <li className={getLinkClass("/doctor-dashboard/appointments/manage-appointments")}>
                  Manage Appointments
                </li>
              </Link>
              <Link to="/doctor-dashboard/appointments/view-appointments">
                <li className={getLinkClass("/doctor-dashboard/appointments/view-appointments")}>
                  View Appointments
                </li>
              </Link>
            </ul>
          )}

          <Link to="/doctor-dashboard/messages">
            <li className={getLinkClass("/doctor-dashboard/messages")}>
              <MessageSquareText />
              <div>Messages</div>
            </li>
          </Link>
          <Link to="/doctor-dashboard/histories">
            <li className={getLinkClass("/doctor-dashboard/histories")}>
              <History />
              <div>History</div>
            </li>
          </Link>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t-2">
          <li className="p-2 rounded gap-3 cursor-pointer mb-2 flex transition-all duration-300 transform hover:bg-orange-500 hover:text-white ml-12">
            <div className="flex gap-3 ">
              <Bell className="mt-1" /> <div>Notifications</div>
            </div>
          </li>

          {/* Settings Option */}
          <Link to="/doctor-dashboard/settings">
            <li className={` ${getLinkClass("/doctor-dashboard/settings")} ml-12` }>
              <Settings />
              <div>Settings</div>
            </li>
          </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span>Logout</span>
        </button>
      </div>

      {/* Render Settings Modal */}
      {/* {isSettingsOpen && (
        <SettingsModal isOpen={isSettingsOpen} setIsOpen={setSettingsOpen} />
      )} */}
    </div>
  );
}
