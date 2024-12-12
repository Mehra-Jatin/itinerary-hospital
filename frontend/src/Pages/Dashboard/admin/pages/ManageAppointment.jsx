import React, { useState, useEffect, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { formatDate, formatTime } from '@/lib/utils';
import { useAdmin } from '@/contexts/AdminContext';

const AppointmentDetailsModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
        <div className="space-y-2">
          <p><strong>ID:</strong> {appointment._id}</p>
          <p><strong>Doctor:</strong> {appointment.doctorId?.name || 'N/A'}</p>
          <p><strong>Patient:</strong> {appointment.userId?.name || 'N/A'}</p>
          <p><strong>Date:</strong> {formatDate(appointment.date)}</p>
          <p><strong>Time:</strong> {formatTime(appointment.time)}</p>
          <p><strong>Payment Status:</strong> {appointment.paymentStatus}</p>
          <p><strong>Appointment Status:</strong> {appointment.appointmentStatus}</p>
        </div>
        <Button onClick={onClose} className="mt-4 w-full">Close</Button>
      </div>
    </div>
  );
};

const ManageAppointment = () => {
  const { Appointments, fetchAllAppointments } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
  const [displayCount, setDisplayCount] = useState(10);

  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const filteredAndSortedAppointments = useMemo(() => {
    let result = Appointments;

    if (statusFilter && statusFilter !== 'all') {
      result = result.filter(apt => apt.appointmentStatus === statusFilter);
    }

    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      result = result.filter(apt => 
        apt._id.toLowerCase().includes(lowercasedTerm) ||
        apt.doctorId?.name?.toLowerCase().includes(lowercasedTerm) ||
        apt.userId?.name?.toLowerCase().includes(lowercasedTerm)
      );
    }

    result = result.sort((a, b) => {
      const modifier = sortConfig.direction === 'asc' ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) return -1 * modifier;
      if (a[sortConfig.key] > b[sortConfig.key]) return 1 * modifier;
      return 0;
    });

    return result.slice(0, displayCount);
  }, [Appointments, searchTerm, statusFilter, sortConfig, displayCount]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl">Manage Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 mb-4">
          <Input
            placeholder="Search by ID, doctor or patient name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3"
          />
          <Select 
            value={statusFilter || ''} 
            onValueChange={(value) => setStatusFilter(value || null)}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Select 
            value={displayCount.toString()} 
            onValueChange={(value) => setDisplayCount(Number(value))}
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Display Count" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Appointments</SelectItem>
              <SelectItem value="20">20 Appointments</SelectItem>
              <SelectItem value="50">50 Appointments</SelectItem>
              <SelectItem value="100">100 Appointments</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-2 py-1 md:px-4 md:py-2" onClick={() => handleSort('date')}>
                  Date {sortConfig.key === 'date' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </TableHead>
                <TableHead className="px-2 py-1 md:px-4 md:py-2" onClick={() => handleSort('time')}>
                  Time {sortConfig.key === 'time' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                </TableHead>
                <TableHead className="px-2 py-1 md:px-4 md:py-2">ID</TableHead>
                <TableHead className="px-2 py-1 md:px-4 md:py-2">Doctor</TableHead>
                <TableHead className="px-2 py-1 md:px-4 md:py-2">Patient</TableHead>
                <TableHead className="px-2 py-1 md:px-4 md:py-2">Status</TableHead>
                <TableHead className="px-2 py-1 md:px-4 md:py-2">Payment</TableHead>
                <TableHead className="px-2 py-1 md:px-4 md:py-2">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedAppointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">{formatDate(appointment.date)}</TableCell>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">{formatTime(appointment.time)}</TableCell>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">{appointment._id}</TableCell>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">{appointment.doctorId?.name || 'N/A'}</TableCell>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">{appointment.userId?.name || 'N/A'}</TableCell>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">{appointment.appointmentStatus}</TableCell>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">{appointment.paymentStatus}</TableCell>
                  <TableCell className="px-2 py-1 md:px-4 md:py-2">
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedAppointment(appointment)}
                      className="w-full md:w-auto"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {selectedAppointment && (
          <AppointmentDetailsModal 
            appointment={selectedAppointment} 
            onClose={() => setSelectedAppointment(null)} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default ManageAppointment;

