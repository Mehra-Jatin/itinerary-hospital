import { useAuth } from "@/hooks/useAuth";
import { CalendarCheck, History, LayoutDashboardIcon, MessageSquareText, User } from "lucide-react";
import { useLocation, Link } from "react-router-dom"; // Import useLocation from react-router-dom

export default function DashContent() {
  const { user, loading, setUser } = useAuth();
  const location = useLocation(); // Get the current location/path

  // console.log(user);

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
    return `p-2 rounded gap-3 cursor-pointer mb-2 flex transition-all duration-300 transform bg ${isActive ? 'bg-orange-200 text-orange-600' : 'hover:bg-orange-500 hover:text-white'}`;
  };

  return (
    <>
      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8 overflow-auto mt-10">
        <img className="rounded-full w-24 h-24" src={user.Image} alt="Doctor Profile" />
        <h2 className="text-lg font-semibold">
          {user.FirstName} {user.LastName}
        </h2>
        <p className="text-sm text-gray-600">{user.specialization}</p>
      </div>

      {/* Navigation Links */}
      <ul className="flex justify-end flex-col ml-4">
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
        <Link to="/doctor-dashboard/appointments">
          <li className={getLinkClass("/doctor-dashboard/appointments")}>
            <User />
            <div>Appointments</div>
          </li>
        </Link>
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
    </>
  );
}
