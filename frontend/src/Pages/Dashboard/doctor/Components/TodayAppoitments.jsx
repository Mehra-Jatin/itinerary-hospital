import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import NextPatient from './NextPatient';
// import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext';
import api from '@/utils/api';

export default function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const { user, getToken } = useContext(AuthContext);

  // Fetch appointments and user data
  useEffect(() => {
    const fetchAppointmentsAndUsers = async () => {
      try {
        const Token =await getToken()
        // console.log('tk',Token);
        
        const token = await getToken();
        setLoading(true);
        const response = await api.get(`/appointment/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`, // Ensure getToken is a function call if it fetches the token
          },
        });
        console.log('log',response.data);
        
        if (response.status === 200) { // Use `response.status` for axios instead of `response.ok`
          setAppointments(response.data.appointment); // Access `response.data` for the data payload
        } else {
          throw new Error(response.data.message || 'Failed to fetch appointments');
        }

        // Fetch appointments
        const appointmentResponse = await api.get(
          `/appointment/${user._id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { appointment: fetchedAppointments } = appointmentResponse.data;

        if (appointmentResponse.status !== 200) {
          throw new Error(appointmentResponse.data.message || 'Failed to fetch appointments');
        }

        // Filter appointments by today's date
        const today = new Date();
        const todayAppointments = fetchedAppointments.filter((appointment) => {
          console.log('appt',appointment);
          
          const appointmentDate = new Date(appointment.date); // Adjust key based on your backend date field
          console.log('dt',appointmentDate);
          
          return (
            appointmentDate.getFullYear() === today.getFullYear() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getDate() === today.getDate()
          );
        });

        setAppointments(todayAppointments);

        // Fetch user details for each userId
        const userResponses = await Promise.all(
          todayAppointments.map(async (appointment) => {
            if (appointment.userId) {
              const userResponse = await api.get(
                `/user/${appointment.userId}`,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return { userId: appointment.userId, userData: userResponse.data.user };
            }
            return null;
          })
        );

        // Transform user responses into a dictionary for quick lookup
        const userDataMap = userResponses.reduce((acc, userResponse) => {
          if (userResponse) acc[userResponse.userId] = userResponse.userData;
          return acc;
        }, {});

        setUserDetails(userDataMap);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentsAndUsers();
  }, [user, getToken]);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading appointments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Today's Appointments */}
      <Card className="shadow-lg h-screen overflow-auto bg-blue-50 to-yellow-100">
        <h2 className="text-xl font-semibold mb-8 text-center mt-5">Today's Appointments</h2>
        <div className="grid gap-3">
          {appointments.map((appointment) => {
            if (appointment.appointmentStatus !== 'confirmed') return null;

            const userData = userDetails[appointment.userId] || {};

            return (
              <motion.div
                key={appointment._id}
                className="flex justify-between bg-blue-50 py-3 px-4 rounded-lg cursor-pointer hover:bg-orange-100 hover:text-orange-500"
                whileHover={{ scale: 1.05 }}
                onClick={() => handleAppointmentClick(appointment)}
              >
                <div className="flex gap-5">
                  <img
                    src={userData.profilePicture || '/default-profile.jpg'}
                    alt="Profile"
                    className="object-cover w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {userData.FirstName} {userData.LastName}
                    </p>
                    <p className="text-sm hover:text-orange-600">
                      {appointment.appointmentStatus}
                    </p>
                  </div>
                </div>
                <div className="text-gray-600">{appointment.time}</div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Appointment Details */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, x: 50 }}
        animate={selectedAppointment ? { opacity: 1, x: 0 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {selectedAppointment ? (
          <NextPatient appointment={selectedAppointment} />
        ) : (
          <p className="text-center text-gray-500">Click on an appointment to see details.</p>
        )}
      </motion.div>
    </div>
  );
}
