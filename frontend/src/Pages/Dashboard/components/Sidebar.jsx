import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UserCog, Users, Calendar, DollarSign, MessageSquare, ClipboardList, LogOut } from 'lucide-react';
import { cn } from "@/lib/utils";

const Sidebar = ({ userRole }) => {
  const location = useLocation();

  const adminLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin-dashboard' },
    { name: 'Manage Doctors', icon: UserCog, path: '/admin-dashboard/manage-doctors' },
    { name: 'Manage Patients', icon: Users, path: '/admin-dashboard/manage-patients' },
    { name: 'Manage Appointments', icon: Calendar, path: '/admin-dashboard/manage-appointments' },
    { name: 'Transactions', icon: DollarSign, path: '/admin-dashboard/all-transactions' },
  ];

  const doctorLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/doctor-dashboard' },
    { name: 'Manage Appointments', icon: Calendar, path: '/doctor-dashboard/manage-appointments' },
    { name: 'History', icon: ClipboardList, path: '/doctor-dashboard/history' },
    { name: 'Chat', icon: MessageSquare, path: '/doctor-dashboard/chat' },
  ];

  const links = userRole === 'admin' ? adminLinks : doctorLinks;

  return (
    <div className="flex flex-col h-full w-64 text-black bg-slate-100">
      <div className="p-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                  location.pathname === link.path
                    ? "bg-orange-700 text-white"
                    : "text-orange-100 hover:bg-orange-500"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        <button className="flex items-center space-x-3 w-full p-3 rounded-lg text-orange-100 hover:bg-orange-500 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

