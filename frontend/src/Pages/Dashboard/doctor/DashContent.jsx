import { useAuth } from "@/hooks/useAuth";
import { CalendarCheck, History, LayoutDashboardIcon, MessageSquareText, User } from "lucide-react";


export default function DashContent (){
    const {user,loading,setUser}=useAuth()
    console.log(user);
    
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
    return (
   <>
    {/* Profile Section */}
    
    <div className="flex flex-col items-center mb-8 overflow-auto mt-10">
    <img
        className="rounded-full w-24 h-24"
        src={user.Image}
        alt="Doctor Profile"
      />
      <h2 className="text-lg font-semibold">{user.FirstName} {user.LastName}</h2>
      <p className="text-sm text-gray-600">{user.specialization}</p>
    </div>

    {/* Navigation Links */}
    <ul className="flex justify-end flex-col ml-4">
      <li className="p-2 bg-slate-50  rounded gap-3 cursor-pointer mb-2 hover:bg-gray-300 flex">
        <LayoutDashboardIcon/> <div>Dashboard</div>
      </li>
      <li className="p-2 hover:text-blue-800 rounded gap-3 cursor-pointer mb-2 hover:bg-gray-300 flex">
        <CalendarCheck /> <div>Schedule</div>
      </li>
      <li className="p-2 hover:text-blue-800 rounded gap-3 cursor-pointer mb-2 hover:bg-gray-300 flex">
        <User /> <div>Appointments</div>
      </li>
      <li className="p-2 hover:text-blue-800 rounded gap-3 cursor-pointer mb-2 hover:bg-gray-300 flex">
        <MessageSquareText /> <div>Messages</div>
      </li>
      <li className="p-2 hover:text-blue-800 rounded gap-3 cursor-pointer mb-2 hover:bg-gray-300 flex">
        <History /> <div>History</div>
      </li>
    </ul>
  </>
    )
}