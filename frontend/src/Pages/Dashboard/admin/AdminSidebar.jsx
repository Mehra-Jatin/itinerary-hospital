import React, { useState } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { LayoutDashboard, UserCog, Users, CalendarCheck, Receipt, Bell, Settings, LogOut, ChevronRight, ChevronDown, Dot, Mail, House } from 'lucide-react';
import { Link, useLocation } from "react-router-dom";
import NotificationCount from './components/NotificationCount';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';

const AdminSidebar = () => {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const [expandedSection, setExpandedSection] = useState(null);
  const [notificationCount, setNotificationCount] = useState(1);

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

  const handleLogout = () => {
    logout();
    window.location.href = "/auth/login";
  };

  const getLinkClass = (path, isNested = false) => {
    const isActive = location.pathname === path;
    return `flex items-center p-3 rounded-lg gap-3 cursor-pointer mb-2 transition-all duration-300 ease-in-out transform ${
      isActive
        ? 'bg-orange-100 text-orange-600 font-medium'
        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-500'
    } ${isNested ? 'pl-10' : ''}`;
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const navItems = [
    { path: "/admin-dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { 
      icon: UserCog, 
      label: "Manage Doctors", 
      subItems: [
            { path: "/admin-dashboard/manage-doctors", icon: Dot, label: "Manage Doctors" },
            { path: "/admin-dashboard/verify-doctors", icon: Dot, label: "Verify Doctors" }
      ]
    },
    { path: "/admin-dashboard/manage-patients", icon: Users, label: "Manage Patients" },
    { path: "/admin-dashboard/manage-appointments", icon: CalendarCheck, label: "Manage Appointments" },
    { path: "/admin-dashboard/transactions", icon: Receipt, label: "Transactions" },
    { 
      icon: Mail, 
      label: "Support", 
      subItems: [
            { path: "/admin-dashboard/doctor-messages", icon: Dot, label: "Doctor Messages" },
            { path: "/admin-dashboard/patient-messages", icon: Dot, label: "Patient Messages" },
            { path: "/admin-dashboard/user-messages", icon: Dot, label: "User Messages" }
      ]
    },
    { path: "/admin-dashboard/manageui", icon: House, label: "Manage UI" },
  ];

  const bottomNavItems = [
    { 
      path: "/admin-dashboard/notifications", 
      icon: Bell, 
      label: "Notifications",
      extra: <NotificationCount count={notificationCount} />
    },
    { path: "/admin-dashboard/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-white p-6 h-full w-80 sm:w-72 flex flex-col border-r border-gray-200 ">
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative">
          <img
            className="rounded-full w-20 h-20 border-4 border-orange-200 shadow-lg object-cover"
            src={user.Image || "https://t3.ftcdn.net/jpg/02/03/40/20/360_F_203402061_1nSZ5lt348w8E0suHMggk5pEQ4LGhePZ.jpg"}
            alt="Admin Profile"
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">
          {user.FirstName} {user.LastName}
        </h2>
        <p className="text-sm text-gray-600 mt-1">Administrator</p>
      </div>

      {/* Navigation Links */}
      <ScrollArea className="flex-grow overflow-y-auto text-base">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.subItems ? (
                <div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSection(item.label)}
                    className={`w-full ${getLinkClass('')}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="flex-grow text-left">{item.label}</span>
                    {expandedSection === item.label ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </motion.button>
                  <AnimatePresence>
                    {expandedSection === item.label && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-1 space-y-1 overflow-hidden"
                      >
                        {item.subItems.map((subItem) => (
                          <motion.li 
                            key={subItem.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Link
                              to={subItem.path}
                              className={getLinkClass(subItem.path, true)}
                              onClick={() => setExpandedSection(null)}
                            >
                              <subItem.icon className="w-5 h-5" />
                              <span className="flex-grow">{subItem.label}</span>
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={getLinkClass(item.path)}
                  onClick={() => setExpandedSection(null)}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="flex-grow">{item.label}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <ul className="space-y-1 mb-4">
          {bottomNavItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className={getLinkClass(item.path)}>
                <item.icon className="w-5 h-5" />
                <span className="flex-grow">{item.label}</span>
                {item.extra}
              </Link>
            </li>
          ))}
        </ul>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button" 
          onClick={handleLogout} 
          className="w-full px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center justify-center"
        >
          <LogOut className="w-5 h-5 mr-2" />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );
}

export default AdminSidebar;