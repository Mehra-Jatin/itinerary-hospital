import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import NextPatient from './NextPatient';

export default function TodayAppoitments(){
      // Dummy data for appointments
  const dummyAppointments = [
    {
      _id: '1',
      userId: {
        FirstName: 'John',
        LastName: 'Doe',
        email: 'john.doe@example.com',
        profilePicture: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        PhoneNo: '1234567890',
        age: 30,
        gender: 'Male',
      },
      bookingDetails: {
        appointmentStatus: 'Confirmed',
        createdAt: '2024-11-01',
        lastAppointment: '2023-12-15',
        appointmentTime: '10:00 AM',
      },
      address: '123 Main Street, Cityville',
      weight: '75 kg',
      height: '180 cm',
      conditions: ['Diabetes', 'Hypertension'],
    },
    {
      _id: '2',
      userId: {
        FirstName: 'Jane',
        LastName: 'Smith',
        email: 'jane.smith@example.com',
        profilePicture: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        PhoneNo: '9876543210',
        age: 28,
        gender: 'Female',
      },
      bookingDetails: {
        appointmentStatus: 'Confirmed',
        createdAt: '2024-11-02',
        lastAppointment: '2023-12-16',
        appointmentTime: '11:30 AM',
      },
      address: '456 Oak Avenue, Townsville',
      weight: '65 kg',
      height: '165 cm',
      conditions: ['Asthma'],
    },
    {
      _id: '3',
      userId: {
        FirstName: 'Michael',
        LastName: 'Brown',
        email: 'michael.brown@example.com',
        profilePicture: 'https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        PhoneNo: '1122334455',
        age: 35,
        gender: 'Male',
      },
      bookingDetails: {
        appointmentStatus: 'Cancelled',
        createdAt: '2024-11-03',
        lastAppointment: '2023-12-17',
        appointmentTime: '02:00 PM',
      },
      address: '789 Pine Road, Villagetown',
      weight: '85 kg',
      height: '175 cm',
      conditions: ['Obesity'],
    },
  ];
  

  const [appointments, setAppointments] = useState(dummyAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };
  console.log(selectedAppointment);
  
         {/* Appointments Section */}
  return (       
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Today's Appointments */}
  <Card className="shadow-lg h-screen overflow-auto bg-blue-50 to-yellow-100">
    <h2 className="text-xl font-semibold mb-8 text-center mt-5">Today's Appointments</h2>
    <div className="grid gap-3">
      {appointments.map((appointment) => {
        if( appointment.bookingDetails.appointmentStatus!=='Confirmed') return;
        return (
       <motion.div
          key={appointment._id}
          className={`flex justify-between bg-blue-50 py-3 px-4 rounded-lg cursor-pointer hover:bg-orange-100 hover:text-orange-500 `}
          whileHover={{ scale: 1.05 }}
          onClick={() => handleAppointmentClick(appointment)}
        >
          <div className="flex gap-5">
            <img
              src={appointment.userId.profilePicture}
              alt="Profile"
              className="object-cover w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-semibold">
                {appointment.userId.FirstName} {appointment.userId.LastName}
              </p>
              <p className="text-sm  hover:text-orange-600">{appointment.bookingDetails.appointmentStatus}</p>
            </div>
          </div>
          <div className="text-gray-600">{appointment.bookingDetails.appointmentTime}</div>
        </motion.div>
      )}
      )}
    
    </div>
  </Card>

  {/* Appointment Requests */}
  <motion.div
    className="w-full "
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
  )
}