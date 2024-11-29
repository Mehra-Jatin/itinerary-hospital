import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from './Components/TableModal';
import { AuthContext } from '@/contexts/AuthContext';

const DocAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const { user, getToken } = useContext(AuthContext);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, statusFilter, dateFilter]);

  const fetchAppointments = async () => {
    const Token = await getToken();
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/appointment/${user._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`,
        },
      });

      const appointmentsWithUserDetails = await Promise.all(
        response.data.appointment.map(async (appointment) => {
          const userResponse = await axios.get(
            `http://localhost:4000/api/v1/user/${appointment.userId}`,
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Token}`,
              },
            }
          );
          return { ...appointment, user: userResponse.data.user };
        })
      );
      setAppointments(appointmentsWithUserDetails);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const filterAppointments = () => {
    let filtered = [...appointments];
    if (statusFilter) {
      filtered = filtered.filter((a) => a.appointmentStatus === statusFilter);
    }
    if (dateFilter) {
      filtered = filtered.filter((a) => a.date.startsWith(dateFilter));
    }
    setFilteredAppointments(filtered);
  };

  const handleRowClick = (appointment) => {
    setSelectedAppointment(appointment);
    setModalOpen(true);
  };

  const updateAppointmentStatus = async (status) => {
    const Token = await getToken();
    try {
      await axios.put(
        `http://localhost:4000/api/v1/appointment/update`,
        {
          appointmentId: selectedAppointment._id,
          status: status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      fetchAppointments();
      setModalOpen(false);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const formatDate = (date) => {
    return date.split('T')[0]; // Converts "2024-11-29T10:16:00.000Z" → "2024-11-29"
  };

  return (
    <div className="p-6 shadow-orange-300 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Appointments</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="w-full">
  <table className="table-auto w-full border-collapse border border-gray-300 hidden md:table">
    <thead>
      <tr className="bg-gray-100">
        <th className="border px-4 py-2">Name</th>
        <th className="border px-4 py-2">Age</th>
        <th className="border px-4 py-2">Appointment Date</th>
        <th className="border px-4 py-2">Appointment Time</th>
        <th className="border px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {filteredAppointments.map((appointment) => (
        <tr
          key={appointment._id}
          className="rounded-lg cursor-pointer hover:bg-orange-500 hover:text-white ease-in-out delay-150 hover:-translate-y-0 hover:scale-110 duration-200"
          onClick={() => handleRowClick(appointment)}
        >
          <td className="border px-4 py-2">
            {appointment.user.FirstName} {appointment.user.LastName}
          </td>
          <td className="border px-4 py-2">{appointment.user.age}</td>
          <td className="border px-4 py-2">{formatDate(appointment.date)}</td>
          <td className="border px-4 py-2">{appointment.time}</td>
          <td className="border px-4 py-2">{appointment.appointmentStatus}</td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* Mobile View */}
  <div className="block md:hidden">
    {filteredAppointments.map((appointment) => (
      <div
        key={appointment._id}
        className="border rounded-lg p-4 mb-4 shadow hover:bg-orange-500 hover:text-white cursor-pointer"
        onClick={() => handleRowClick(appointment)}
      >
        <p>
          <strong>Name:</strong> {appointment.user.FirstName} {appointment.user.LastName}
        </p>
        <p>
          <strong>Age:</strong> {appointment.user.age}
        </p>
        <p>
          <strong>Appointment Date:</strong> {formatDate(appointment.date)}
        </p>
        <p>
          <strong>Appointment Time:</strong> {appointment.time}
        </p>
        <p>
          <strong>Status:</strong> {appointment.appointmentStatus}
        </p>
      </div>
    ))}
  </div>
</div>


      {modalOpen && selectedAppointment && (
        <Modal
          appointment={selectedAppointment}
          closeModal={() => setModalOpen(false)}
          updateStatus={updateAppointmentStatus}
        />
      )}
    </div>
  );
};

export default DocAppointment;
