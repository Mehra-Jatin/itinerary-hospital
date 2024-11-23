import React, { useState } from 'react';
import { format, parseISO, isBefore, isEqual, isAfter, isWithinInterval } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Delete, Edit } from 'lucide-react';

const Scheduler = () => {
  const initialSchedules = [
    { id: 1, start: '2024-11-23T06:34', end: '2024-11-23T07:38', status: 'Confirmed' },
    { id: 2, start: '2024-11-24T06:34', end: '2024-11-24T07:38', status: 'Canceled' },
  ];

  const [schedules, setSchedules] = useState(initialSchedules);
  const [form, setForm] = useState({ id: null, start: '', end: '', status: 'Confirmed' });
  const [filter, setFilter] = useState({ start: '', end: '', status: '' });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const isOverlapping = (newStart, newEnd, excludeId = null) => {
    return schedules.some(({ start, end, id }) => {
      if (excludeId && id === excludeId) return false;
      const startTime = parseISO(start);
      const endTime = parseISO(end);
      const newStartTime = parseISO(newStart);
      const newEndTime = parseISO(newEnd);

      return (
        (isBefore(newStartTime, endTime) && isAfter(newEndTime, startTime)) ||
        isEqual(newStartTime, startTime) ||
        isEqual(newEndTime, endTime)
      );
    });
  };

  const handleAddOrUpdate = () => {
    const { id, start, end, status } = form;
    const parsedStart = parseISO(start);
    const parsedEnd = parseISO(end);

    if (isBefore(parsedEnd, parsedStart) || isEqual(parsedEnd, parsedStart)) {
      alert('End time must be after start time.');
      return;
    }

    if (isOverlapping(start, end, id)) {
      alert('This time slot is already booked. Please choose another.');
      return;
    }

    const newSchedule = { id: id ?? Date.now(), start, end, status };

    if (id) {
      setSchedules((prev) => prev.map((item) => (item.id === id ? newSchedule : item)));
    } else {
      setSchedules((prev) => [...prev, newSchedule]);
    }

    setForm({ id: null, start: '', end: '', status: 'Confirmed' });
  };

  const handleDelete = (id) => {
    setSchedules((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const schedule = schedules.find((item) => item.id === id);
    if (schedule) setForm(schedule);
  };

  const filteredSchedules = schedules.filter(({ start, status }) => {
    const startDate = filter.start ? parseISO(filter.start) : null;
    const endDate = filter.end ? parseISO(filter.end) : null;
    const scheduleStart = parseISO(start);

    const matchesDate =
      (!startDate && !endDate) ||
      (startDate && endDate && isWithinInterval(scheduleStart, { start: startDate, end: endDate })) ||
      (startDate && isAfter(scheduleStart, startDate)) ||
      (endDate && isBefore(scheduleStart, endDate));

    const matchesStatus = !filter.status || status === filter.status;

    return matchesDate && matchesStatus;
  });

  return (
    <div className="p-6 max-w-2xl mx-auto bg-blue-50 rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Appointment Scheduling</h1>
      
      {/* Form to Add/Update Schedule */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-600">Start Time:</label>
        <input
          type="datetime-local"
          name="start"
          value={form.start}
          onChange={handleInputChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label className="block text-sm font-medium text-gray-600 mt-4">End Time:</label>
        <input
          type="datetime-local"
          name="end"
          value={form.end}
          onChange={handleInputChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        
        <button
          onClick={handleAddOrUpdate}
          className="mt-4 px-4 py-2 bg-blue-400 text-white rounded hover:bg-orange-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-200"
        >
          {form.id ? 'Update Schedule' : 'Add Schedule'}
        </button>
      </div>

      {/* Filter Form */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-3 text-center">Filter by Date and Status</h2>
        
        <label className="block text-sm font-medium text-gray-600">Start Date:</label>
        <input
          type="date"
          name="start"
          value={filter.start}
          onChange={handleFilterChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label className="block text-sm font-medium text-gray-600 mt-4">End Date:</label>
        <input
          type="date"
          name="end"
          value={filter.end}
          onChange={handleFilterChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <label className="block text-sm font-medium text-gray-600 mt-4">Status:</label>
        <select
          name="status"
          value={filter.status}
          onChange={handleFilterChange}
          className="block w-full px-3 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">All</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>

      {/* Schedules Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Start</th>
            <th className="border border-gray-300 px-4 py-2">End</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {filteredSchedules.map(({ id, start, end, status }) => (
              <motion.tr
                key={id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="border border-gray-300"
              >
                <td className="border border-gray-300 px-4 py-2">{format(parseISO(start), 'Pp')}</td>
                <td className="border border-gray-300 px-4 py-2">{format(parseISO(end), 'Pp')}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    status === 'Canceled' ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {status}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                <div className="mt-3 md:mt-0 flex">
              <motion.button
                onClick={() => handleEdit(id)}
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.9, rotate: -10 }}
                className="mr-3 text-blue-500 hover:bg-blue-100 p-2 rounded"
              >
                <Edit />
              </motion.button>
              <motion.button
                onClick={() => handleDelete(id)}
                whileHover={{
                  scale: 1.2,
                  backgroundColor: 'rgb(255, 205, 205)',
                  color: '#b91c1c',
                }}
                whileTap={{ scale: 0.9 }}
                className="text-red-500 hover:bg-red-100 p-2 rounded"
              >
                <Delete />
              </motion.button>
            </div>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
};

export default Scheduler;
