import { Save } from 'lucide-react';
import React, { useState } from 'react';
import { MdClose, MdChat } from 'react-icons/md'; // Chat Icon
import { format, isWithinInterval } from 'date-fns';

const AppointmentTable = () => {
  const dummyAppointments = [
    {
      _id: '1',
      userId: {
        FirstName: 'John',
        LastName: 'Doe',
        Age: 28,
        appointmentDate: '2024-11-25',
        appointmentTime: '2024-11-25T14:30:00Z',
      },
      bookingDetails: { appointmentStatus: 'Pending' },
    },
    {
      _id: '2',
      userId: {
        FirstName: 'Jane',
        LastName: 'Smith',
        Age: 34,
        appointmentDate: '2024-11-26',
        appointmentTime: '2024-11-26T10:00:00Z',
      },
      bookingDetails: { appointmentStatus: 'Confirmed' },
    },
    {
      _id: '3',
      userId: {
        FirstName: 'Alice',
        LastName: 'Johnson',
        Age: 22,
        appointmentDate: '2024-11-27',
        appointmentTime: '2024-11-27T16:00:00Z',
      },
      bookingDetails: { appointmentStatus: 'Completed' },
    },
  ];

  const [appointments, setAppointments] = useState(dummyAppointments);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
    setStatus(appointment.bookingDetails.appointmentStatus);
  };

  const handleStatusChange = (event) => setStatus(event.target.value);

  const handleUpdateStatus = () => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt._id === selectedAppointment._id
          ? {
              ...appt,
              bookingDetails: { ...appt.bookingDetails, appointmentStatus: status },
            }
          : appt
      )
    );
    setIsModalOpen(false);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchStatus = !filterStatus || appointment.bookingDetails.appointmentStatus === filterStatus;
    const matchDate =
      (!startDate && !endDate) ||
      (startDate &&
        endDate &&
        isWithinInterval(new Date(appointment.userId.appointmentDate), {
          start: new Date(startDate),
          end: new Date(endDate),
        }));
    return matchStatus && matchDate;
  });

  return (
    <div className="p-4">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="py-2 px-4 border rounded-md"
        >
          <option value="">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Confirmed">Rescheduled</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="py-2 px-4 border rounded-md"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="py-2 px-4 border rounded-md"
        />
      </div>

      {/* Responsive Table */}
      <div className="appointments-container">
        <table className="appointments-table w-full border-collapse hidden lg:table">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Age</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => {
              const { FirstName, LastName, Age, appointmentDate } = appointment.userId;
              const appointmentStatus = appointment.bookingDetails.appointmentStatus;

              return (
                <tr
                  key={appointment._id}
                  onClick={() => handleRowClick(appointment)}
                  className="cursor-pointer hover:bg-orange-100"
                >
                  <td className="border px-4 py-2">{FirstName} {LastName}</td>
                  <td className="border px-4 py-2">{Age}</td>
                  <td className="border px-4 py-2">{format(new Date(appointmentDate), 'yyyy-MM-dd')}</td>
                  <td className="border px-4 py-2">{appointmentStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="mobile-view lg:hidden">
          {filteredAppointments.map((appointment) => {
            const { FirstName, LastName, Age, appointmentDate } = appointment.userId;
            const appointmentStatus = appointment.bookingDetails.appointmentStatus;

            return (
              <div
                key={appointment._id}
                className="p-4 bg-white rounded-lg shadow-md mb-4 cursor-pointer hover:bg-orange-100"
                onClick={() => handleRowClick(appointment)}
              >
                <p>
                  <strong>{FirstName} {LastName}</strong>
                </p>
                <p>Age: {Age}</p>
                <p>Date: {format(new Date(appointmentDate), 'yyyy-MM-dd')}</p>
                <p>Status: {appointmentStatus}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center h-screen">
          <div className="bg-white p-8 rounded-lg relative w-full lg:w-2/5">
            <MdClose
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 cursor-pointer text-gray-700"
              size={24}
            />
            <p><strong>First Name:</strong> {selectedAppointment.userId.FirstName}</p>
            <p><strong>Last Name:</strong> {selectedAppointment.userId.LastName}</p>
            <p><strong>Age:</strong> {selectedAppointment.userId.Age}</p>
            <p><strong>Date:</strong> {selectedAppointment.userId.appointmentDate}</p>
            <p><strong>Status:</strong> {status}</p>

            <div className="mt-4">
              <label>Update Status:</label>
              <select
                value={status}
                onChange={handleStatusChange}
                className="py-2 px-4 border rounded-md"
                disabled={selectedAppointment.bookingDetails.appointmentStatus === 'Completed'}
              >
                <option value="Confirmed">Rescheduled</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={handleUpdateStatus}
                className="py-2 px-4 bg-blue-500 text-white rounded-md"
              >
                <Save /> Save Changes
              </button>
              {status !== 'Cancelled' && status !== 'Completed' && (
                <button
                  onClick={() => alert('Chat initiated!')}
                  className="flex items-center text-white bg-green-500 p-2 rounded-full"
                >
                  <MdChat size={20} /> Chat
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
