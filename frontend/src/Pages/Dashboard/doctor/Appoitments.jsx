import AppointmentCard from "@/components/AppointmentCard";
import appoitData from '@/data/AppointmentData'
import {useState} from 'react'

export default function Appointments(){
    const [appointmentsData,setAppointmentsData]=useState(appoitData)
    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4 mt-12 text-center">Appointments</h1>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {appointmentsData.map((user) =>
              user.appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment._id}
                  user={user}
                  appointment={appointment}
                />
              ))
            )}
          </div>
        </div>
      );
    }