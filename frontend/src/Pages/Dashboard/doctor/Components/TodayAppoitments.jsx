import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import NextPatient from './NextPatient';
import { AuthContext } from '@/contexts/AuthContext';
import api from '@/utils/api';

export default function TodayAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const { user, getToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppointmentsAndUsers = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        // Fetch today's appointments
        const response = await api.get(`/appointment/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error(response.data.message || 'Failed to fetch appointments');
        }

        const { appointment: fetchedAppointments } = response.data;

        // Filter appointments for today's date
        const today = new Date();
        const todayAppointments = fetchedAppointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          return (
            appointmentDate.getFullYear() === today.getFullYear() &&
            appointmentDate.getMonth() === today.getMonth() &&
            appointmentDate.getDate() === today.getDate()
          );
        });

        setAppointments(todayAppointments);

        // Fetch user details for each appointment's userId
        const userResponses = await Promise.all(
          todayAppointments.map(async (appointment) => {
            if (appointment.userId) {
              const userResponse = await api.get(`/user/${appointment.userId}`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              });
              return { userId: appointment.userId, userData: userResponse.data.user };
            }
            return null;
          })
        );

        // Map user details for quick lookup
        const userDataMap = userResponses.reduce((acc, userResponse) => {
          if (userResponse) acc[userResponse.userId] = userResponse.userData;
          return acc;
        }, {});
        console.log('user',userDataMap);
        

        setUserDetails(userDataMap);
      } catch (err) {
        console.log(err);
        
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
    // console.log(error);
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
