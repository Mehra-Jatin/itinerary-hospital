import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Modal from './Components/TableModal';
import { AuthContext } from '@/contexts/AuthContext';
import api from '@/utils/api';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      const response = await api.get(`/appointment/${user._id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Token}`,
        },
      });

      const appointmentsWithUserDetails = await Promise.all(
        response.data.appointment.map(async (appointment) => {
          const userResponse = await api.get(
            `/user/${appointment.userId}`,
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
      await api.put(
        `/appointment/update`,
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
    <div className="p-3  shadow-lg rounded-lg">
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
        <Table className="hidden md:table w-full border-collapse border border-gray-300 table-auto">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Appointment Date</TableHead>
              <TableHead>Appointment Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow
                key={appointment._id}
                className="cursor-pointer hover:bg-orange-500 hover:text-white ease-in-out delay-150 hover:-translate-y-0 hover:scale-105 duration-200"
                onClick={() => handleRowClick(appointment)}
              >
                <TableCell>{appointment.user.FirstName} {appointment.user.LastName}</TableCell>
                <TableCell>{appointment.user.age}</TableCell>
                <TableCell>{formatDate(appointment.date)}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell> <span  className={`px-2 py-1 rounded text-sm font-medium ${
                                                                appointment.appointmentStatus === "pending"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : appointment.appointmentStatus === "confirmed"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : appointment.appointmentStatus === "cancelled"
                                                                            ? "bg-red-100 text-red-800"
                                                                            : "bg-gray-100 text-gray-800"
                                                            }`}> {appointment.appointmentStatus}</span> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
