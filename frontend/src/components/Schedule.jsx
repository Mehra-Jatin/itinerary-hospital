import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';

const appointments = [
  { id: 1, FirstName: "John", LastName: "Doe", Date: "2024-11-25", Status: "Pending" },
  { id: 2, FirstName: "Jane", LastName: "Smith", Date: "2024-12-01", Status: "Confirmed" },
  { id: 3, FirstName: "Ravi", LastName: "Kumar", Date: "2024-11-30", Status: "Cancelled" },
];

function ScheduleTable() {
  const [appointmentData, setAppointmentData] = useState(appointments);
  const [showDropdown, setShowDropdown] = useState(null); // Track the open dropdown for each row

  const handleStatusChange = (id, action) => {
    const updatedAppointments = appointmentData.map((appointment) => {
      if (appointment.id === id) {
        return { ...appointment, Status: action }; // Update status based on action
      }
      return appointment;
    });
    setAppointmentData(updatedAppointments);
    setShowDropdown(null); 
  };

  return (
    <div className="overflow-x-auto p-4">
        <h1 className='text-center mt-6 font-bold  text-2xl mb-4'>Schedules</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">First Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Last Name</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointmentData.map((appointment) => (
            <tr key={appointment.id} className="border-b border-gray-200 relative">
              <td className="px-4 py-2 text-sm">{appointment.FirstName}</td>
              <td className="px-4 py-2 text-sm">{appointment.LastName}</td>
              <td className="px-4 py-2 text-sm">{appointment.Date}</td>
              <td className={`relative px-4 py-2 text-sm ${
                appointment.Status === "Pending" ? 'text-yellow-600' :
                appointment.Status === "Confirmed" ? 'text-blue-600' :
                'text-red-600'}`}>
                <span>{appointment.Status}</span>
                <button
                  onClick={() => setShowDropdown(showDropdown === appointment.id ? null : appointment.id)}
                  className="absolute right-0 top-0 mt-1 mr-2 text-gray-600 hover:text-gray-800">
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showDropdown === appointment.id && (
                  <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      {appointment.Status === "Pending" && (
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'Confirmed')}
                          className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100">
                          Confirm Appointment
                        </button>
                      )}
                      {appointment.Status === "Confirmed" && (
                        <button
                          onClick={() => handleStatusChange(appointment.id, 'Cancelled')}
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                          Cancel Appointment
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScheduleTable;
