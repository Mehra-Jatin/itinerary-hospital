import React, { useState, useEffect, useContext } from 'react';
import { Phone, FileText, MessageSquare } from 'lucide-react';
// import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/contexts/AuthContext';
import api from '@/utils/api';

const NextPatient = ({ appointment }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId=appointment.userId
  const {user,getToken}=useContext(AuthContext)
  useEffect(() => {
    const fetchData = async (userId) => {
      try {
        const Token=await getToken()
       
        const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`, // Ensure getToken is a function call if it fetches the token
          },
        });
        // console.log(response);
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = response;
       console.log(data.user);
       
        
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
   

    fetchData(userId);
  }, [userId]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData ) {
    return <div>No upcoming confirmed appointments.</div>;
  }

  const  users  = userData.user;
 
  

  return (
    <div className="max-w-md p-6 bg-blue-50 text-orange-600 rounded-lg shadow-lg">
      <h2 className="text-xl text-center mb-5">Next Patient</h2>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img
            src="https://via.placeholder.com/64" // Replace with user.profilePicture if available
            className="w-full h-full object-cover"
            alt="Patient"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {users.FirstName} {users.LastName}
          </h2>
          <p className="text-sm">{users.address || 'N/A'}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Age</p>
          <p className="font-medium">{users.age || 'N/A'} years</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Sex</p>
          <p className="font-medium">{users.gender || 'N/A'}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Phone</p>
          <p className="font-medium">{users.PhoneNo}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Appointment Time</p>
          <p className="font-medium">{appointment.time}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Appointment Date</p>
          <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Status</p>
          <p className="font-medium">{appointment.appointmentStatus}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
          <Phone size={18} />
          Call
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm bg-white">
          <FileText size={18} />
          Documents
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 text-sm bg-white">
          <MessageSquare size={18} />
          Chat
        </button>
      </div>
    </div>
  );
};

export default NextPatient;
