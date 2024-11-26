import { Save } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import { MdClose, MdChat } from 'react-icons/md'; // Chat Icon
import { format, isWithinInterval } from 'date-fns';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext'; // Assuming AuthContext is defined and provides user info and token

const AppointmentTable = () => {
  const { user, getToken } = useContext(AuthContext); // Context to get user and token
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true); // Set loading to true when the request starts
        const Token = await getToken(); // Ensure you await the token
        const response = await axios.get(`http://localhost:4000/api/v1/appointment/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`, // Send the token in headers
          },
        });

        if (response.status === 200) {
          console.log(response.data);
          
          setAppointments(response.data.appointment); // Store the appointment data in state
        } else {
          throw new Error(response.data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false once the request is finished
      }
    };

    fetchAppointments();
  }, [user._id, getToken]); // Dependency array includes user._id and getToken to re-fetch when user changes

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
    setStatus(appointment.bookingDetails.appointmentStatus);
  };

  const handleUpdateStatus = async () => {
    try {
      const Token = await getToken(); // Get the token from AuthContext
      const response = await axios.patch(
        `http://localhost:4000/api/v1/appointment/update`,
        {
          appointmentId: selectedAppointment._id,
          status: status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
          },
        }
      );
  
      if (response.data.success) {
        // Update the local state with the new status
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
        alert("Appointment status updated successfully!");
      } else {
        alert(response.data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again later.");
    } finally {
      setIsModalOpen(false); // Close the modal after the update
    }
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
      {/* Error Message */}
      {error && <div className="text-red-500">{error}</div>}

      {/* Loading State */}
      {loading && <div>Loading...</div>}

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
