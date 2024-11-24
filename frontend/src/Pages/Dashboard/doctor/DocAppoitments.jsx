import { Save } from 'lucide-react';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md'; // Importing close icon from react-icons

const AppointmentTable = () => {
  // Dummy data for appointments
  const dummyAppointments = [
    {
      "_id": "1",
      "userId": {
        "FirstName": "John",
        "LastName": "Doe",
        "Age": 28,
        "appointmentDate": "2024-11-25",
        "appointmentTime": "2024-11-25T14:30:00Z"
      },
      "bookingDetails": {
        "appointmentStatus": "Pending"
      }
    },
    {
      "_id": "2",
      "userId": {
        "FirstName": "Jane",
        "LastName": "Smith",
        "Age": 34,
        "appointmentDate": "2024-11-26",
        "appointmentTime": "2024-11-26T10:00:00Z"
      },
      "bookingDetails": {
        "appointmentStatus": "Confirmed"
      }
    },
    {
      "_id": "3",
      "userId": {
        "FirstName": "Alice",
        "LastName": "Johnson",
        "Age": 22,
        "appointmentDate": "2024-11-27",
        "appointmentTime": "2024-11-27T16:00:00Z"
      },
      "bookingDetails": {
        "appointmentStatus": "Completed"
      }
    }
  ];

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState(dummyAppointments); // State to store appointments

  // Function to handle row click
  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true); // Open the modal when a row is clicked
    setStatus(appointment.bookingDetails.appointmentStatus); // Set current status
  };

  // Function to handle status change
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to update the status (just updating local state for now)
  const handleUpdateStatus = () => {
    // Update the local state with the new status without server interaction
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === selectedAppointment._id
          ? {
              ...appointment,
              bookingDetails: {
                ...appointment.bookingDetails,
                appointmentStatus: status,
              },
            }
          : appointment
      )
    );
    closeModal();
  };

  return (
    <>
      <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-blue-100">
            <th className="py-3 px-4 text-left">First Name</th>
            <th className="py-3 px-4 text-left">Last Name</th>
            <th className="py-3 px-4 text-left">Age</th>
            <th className="py-3 px-4 text-left">Appointment Date</th>
            <th className="py-3 px-4 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            const { FirstName, LastName, Age, appointmentDate, appointmentTime } = appointment.userId;
            const appointmentStatus = appointment.bookingDetails.appointmentStatus;
            const formattedDate = new Date(appointmentDate).toLocaleDateString();
            const formattedTime = new Date(appointmentTime).toLocaleTimeString();

            return (
              <tr
                key={appointment._id}
                className="cursor-pointer hover:bg-orange-100 hover:text-orange-500"
                onClick={() => handleRowClick(appointment)}
              >
                <td className="py-3 px-4">{FirstName}</td>
                <td className="py-3 px-4">{LastName}</td>
                <td className="py-3 px-4">{Age}</td>
                <td className="py-3 px-4">{formattedDate} {formattedTime}</td>
                <td className="py-3 px-4">{appointmentStatus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal for Appointment Details */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center overflow-auto h-screen">
          <div className="bg-white p-8 rounded-lg w-full lg:w-1/3 max-h-screen overflow-y-auto relative">
            {/* Close Icon in top-right corner */}
            <MdClose
              onClick={closeModal}
              className="absolute top-2 right-2 cursor-pointer text-gray-700"
              size={24}
            />
            
            <div className="grid grid-cols-1 gap-4">
              {/* Appointment Info as Cards */}
              <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <p><strong>First Name:</strong> {selectedAppointment.userId.FirstName}</p>
                <p><strong>Last Name:</strong> {selectedAppointment.userId.LastName}</p>
                <p><strong>Age:</strong> {selectedAppointment.userId.Age}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.userId.appointmentDate).toLocaleDateString()}</p>
                <p><strong>Appointment Time:</strong> {new Date(selectedAppointment.userId.appointmentTime).toLocaleTimeString()}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg shadow-md">
                <p><strong>Status:</strong> {selectedAppointment.bookingDetails.appointmentStatus}</p>
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="status" className="block mb-2">Update Status:</label>
              <select
                id="status"
                value={status}
                onChange={handleStatusChange}
                className="py-2 px-4 border rounded-md"
                disabled={status === 'Pending'} // Disable update if status is 'Pending'
              >
                {status !== 'Pending' && (
                  <>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </>
                )}
              </select>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handleUpdateStatus}
                className="bg-slate-100 text-orange-500 py-2 px-4 rounded-lg flex items-center hover:text-white hover:bg-orange-400 transition-all ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
              >
                <Save />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentTable;
