import { X } from 'lucide-react';
import React from 'react';

const Modal = ({ appointment, closeModal, updateStatus }) => {
  const { user, appointmentStatus, date, time } = appointment;

  const handleStatusChange = (e) => {
    updateStatus(e.target.value);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn z-50">
      <div className="bg-white rounded shadow-lg w-11/12 sm:w-2/3 lg:w-3/3 max-h-96 overflow-auto relative animate-slideUp mb-3">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
          onClick={closeModal}
        >
         <X className='hover:bg-orange-200 w-9 h-9 px-1 py-1 hover:rounded-full ease-in-out delay-150 hover:-translate-y-0 hover:scale-125 duration-200 '/>
        </button>

        <h2 className="text-xl font-bold mb-4 text-center mt-4">Appointment Details</h2>

        {/* Cards for Details */}
        <div className="p-4 space-y-4">
          <div className="border rounded p-4 shadow-sm bg-orange-100 ">
            <h3 className="text-lg font-semibold mb-2">Patient Information</h3>
            <p><strong>Name:</strong> {user.FirstName} {user.LastName}</p>
            <p><strong>Age:</strong> {user.age}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.PhoneNo}</p>
          </div>

          <div className="border rounded p-4 shadow-sm bg-orange-100">
            <h3 className="text-lg font-semibold mb-2">Appointment Details</h3>
            <p><strong>Date:</strong> {new Date(date).toISOString().split('T')[0]}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Status:</strong> {appointmentStatus}</p>
          </div>

          {/* Status Update Dropdown */}
          {(appointmentStatus === 'pending' ||
            appointmentStatus === 'confirmed') && (
            <div className="border rounded p-4 shadow-sm bg-orange-100">
              <h3 className="text-lg font-semibold mb-2">Update Status</h3>
              <select
                className="block w-full border border-gray-300 rounded p-2"
                onChange={handleStatusChange}
                defaultValue=""
              >
                <option value="" disabled>
                  Select new status
                </option>
                {appointmentStatus === 'pending' && (
                  <>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                  </>
                )}
                {appointmentStatus === 'confirmed' && (
                  <>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </>
                )}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
