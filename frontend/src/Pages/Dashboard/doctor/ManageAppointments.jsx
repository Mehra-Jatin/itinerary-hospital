import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Check, Calendar } from 'lucide-react';
import { AuthContext } from '@/contexts/AuthContext';
import api from '@/utils/api';

const ManageAppt = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken, user } = useContext(AuthContext);

  // Fetch appointments and user details
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const Token = await getToken();

        // Fetch appointments for the logged-in user
        const response = await api.get(
          `/appointment/${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        console.log(response.data);
        

        const pendingAppointments = response.data.appointment.filter(
          (appointment) => appointment.appointmentStatus === 'pending'
        );

        // Fetch user details for each appointment
        const appointmentsWithUserDetails = await Promise.all(
          pendingAppointments.map(async (appointment) => {
            const userResponse = await api.get(
              `/user/${appointment.userId}`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Token}`,
                },
              }
            );
            return { ...appointment, userDetails: userResponse.data.user };
          })
        );

        setAppointments(appointmentsWithUserDetails);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [getToken, user._id]);

  // Update appointment status
  const updateStatus = async (appointmentId, status) => {
    try {
      await api.put(
        '/appointment/update',
        { appointmentId, status },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      setAppointments((prev) =>
        prev.filter((appointment) => appointment._id !== appointmentId)
      );
    } catch (error) {
      console.error('Error updating appointment status:', error);
    }
  };
  console.log('appt',appointments);
  

  if (loading)
    return <p className="text-center text-gray-600">Loading appointments...</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 p-4">
      {appointments.length === 0 ? (
        <p className="text-center text-gray-600 col-span-full">
          No pending appointments.
        </p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment._id}
            className="bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-blue-500" />
              <p className="text-gray-700 font-medium">
                {new Date(appointment.date).toLocaleDateString()}
              </p>
            </div>
            <p className="text-gray-500">Time: {appointment.time}</p>
            <p className="text-gray-500">Status: {appointment.appointmentStatus}</p>
            <div className="text-gray-500 mt-2">
              <p className="font-medium">User Details:</p>
              <p>Name: {appointment.userDetails.FirstName} {appointment.userDetails.LastName}</p>
              <p>Email: {appointment.userDetails.email}</p>
              <p>Phone: {appointment.userDetails.PhoneNo}</p>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
                onClick={() => updateStatus(appointment._id, 'confirmed')}
              >
                <Check size={16} />
                Confirm
              </button>
              <button
                className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                onClick={() => updateStatus(appointment._id, 'cancelled')}
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageAppt;
