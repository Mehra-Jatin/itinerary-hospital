import { Save } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import { MdClose, MdChat } from 'react-icons/md';
import { format, isWithinInterval } from 'date-fns';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext';

const AppointmentTable = () => {
  const { user, getToken } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const Token = await getToken();
        const response = await axios.get(`http://localhost:4000/api/v1/appointment/${user._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Token}`,
          },
        });

        if (response.status === 200) {
          // console.log(response.data);
          
          setAppointments(response.data.appointment); // Store the appointment data in state
          // Fetch user details for each appointment concurrently
          const userResponses = await Promise.all(
            response.data.appointment.map(async (appointment) => {
              if (appointment.userId) {
                const userResponse = await axios.get(
                  `http://localhost:4000/api/v1/user/${appointment.userId}`,
                  {
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${Token}`,
                    },
                  }
                );
                return { ...appointment, userData: userResponse.data.user };
              }
              return appointment;
            })
          );
          setAppointments(userResponses);
        } else {
          throw new Error(response.data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user._id, getToken]);

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
    setStatus(appointment.appointmentStatus);
  };

  const handleUpdateStatus = async () => {
    if (status === 'Completed') return; // Prevent updating Completed status

    try {
      const Token = await getToken();
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
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === selectedAppointment._id
              ? {
                  ...appt,
                  appointmentStatus: status,
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
      setIsModalOpen(false);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const matchStatus = !filterStatus || appointment.appointmentStatus === filterStatus;
    const matchDate =
      (!startDate && !endDate) ||
      (startDate &&
        endDate &&
        isWithinInterval(new Date(appointment.date), {
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
          <option value="Confirmed">Confirmed</option>
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
      <div className="appointments-container w-full">
        <table className="appointments-table w-full  border-collapse hidden lg:table shadow-lg bg-white">
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
              console.log('f',appointment.userData);
              
              const { FirstName, LastName, age } = appointment.userData;
              const appointmentStatus = appointment.appointmentStatus;
              const Age=age
              // Format date safely
              const formattedDate = appointment.date && !isNaN(new Date(appointment.date))
                ? format(new Date(appointment.date), 'yyyy-MM-dd')
                : 'Invalid Date';

              return (
                <tr
                  key={appointment._id}
                  onClick={() => handleRowClick(appointment)}
                  className="cursor-pointer hover:bg-orange-100"
                >
                  <td className="border px-4 py-2">{FirstName} {LastName}</td>
                  <td className="border px-4 py-2">{Age}</td>
                  <td className="border px-4 py-2">{formattedDate}</td>
                  <td className="border px-4 py-2">{appointmentStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="mobile-view lg:hidden">
          {filteredAppointments.map((appointment) => {
            console.log('ac',appointment.userData);
            
            const { FirstName, LastName, age } = appointment.userData;
            const appointmentStatus = appointment.appointmentStatus;
            const Age=age
            console.log('ag',Age);
            

            // Format date safely
            const formattedDate = appointment.date && !isNaN(new Date(appointment.date))
              ? format(new Date(appointment.date), 'yyyy-MM-dd')
              : 'Invalid Date';

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
                <p>Date: {formattedDate}</p>
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
            <p><strong>First Name:</strong> {selectedAppointment.userData.FirstName}</p>
            <p><strong>Last Name:</strong> {selectedAppointment.userData.LastName}</p>
            <p><strong>Age:</strong> {selectedAppointment.userData.Age}</p>
            <p><strong>Appointment Date:</strong> {format(new Date(selectedAppointment.date), 'yyyy-MM-dd')}</p>
            <p><strong>Status:</strong> {selectedAppointment.appointmentStatus}</p>

            <div className="mt-4">
              <label className="block text-sm">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                disabled={status === 'Completed'}
                className="py-2 px-4 border rounded-md w-full"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <button
              onClick={handleUpdateStatus}
              className="mt-4 bg-green-500 text-white py-2 px-6 rounded-md"
            >
              <Save size={18} /> Update Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTable;
