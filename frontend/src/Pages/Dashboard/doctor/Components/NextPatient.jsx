import React from 'react';
import { Phone, FileText, MessageSquare } from 'lucide-react';

const NextPatient = ({ appointment }) => {
  if (!appointment) {
    return <div>No upcoming confirmed appointments.</div>;
  }

  const {
    userId: { FirstName, LastName, profilePicture, PhoneNo, age, gender },
    bookingDetails: { appointmentTime, lastAppointment },
    address,
    weight,
    height,
    conditions,
  } = appointment;

  return (
    <div className="max-w-md p-6 bg-blue-50 text-orange-600 rounded-lg shadow-lg">
      <h2 className="text-xl text-center mb-5">Next Patient</h2>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={profilePicture} className="w-full h-full object-cover" alt="Patient" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">
            {FirstName} {LastName}
          </h2>
          <p className=" text-sm">{address}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Age</p>
          <p className="font-medium">{age} years</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Sex</p>
          <p className="font-medium">{gender}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Weight</p>
          <p className="font-medium">{weight}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">Height</p>
          <p className="font-medium">{height}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Last Appointment</p>
          <p className="font-medium">{lastAppointment}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Appointment Time</p>
          <p className="font-medium">{appointmentTime}</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6 flex-wrap">
        {conditions.map((condition, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-blue-200 text-blue-700 rounded-full"
          >
            {condition}
          </span>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm">
          <Phone size={18} />
          {PhoneNo}
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
