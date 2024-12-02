import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Ensure this path is correct
import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '@/contexts/AuthContext';
import api from '@/utils/api';
import { TableBody, TableHead, TableHeader, TableRow, Table, TableCell } from '@/components/ui/table';
import { DeleteIcon, Trash2 } from 'lucide-react';

const ScheduleManager = () => {
const { user, getToken } = useContext(AuthContext);
const [selectedDate, setSelectedDate] = useState(null);
const [availability, setAvailability] = useState(new Map());
const [selectedTimes, setSelectedTimes] = useState([]);
const [newTime, setNewTime] = useState('');
const [filterDate, setFilterDate] = useState(null);

useEffect(() => {
  fetchAvailability();
}, []);

const fetchAvailability = async () => {
  try {
    const token = await getToken();
    const response = await api.get(`/getavailability/${user._id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const { availablity } = response.data;
    if (availablity && typeof availablity === 'object') {
      const availabilityMap = new Map(Object.entries(availablity));
      setAvailability(availabilityMap);
    }
  } catch (error) {
    console.error('Error fetching availability:', error);
  }
};

const handleDateChange = (date) => {
  setSelectedDate(date);
  setSelectedTimes(availability.get(date.toISOString().split('T')[0]) || []);
};

const handleAddTime = () => {
  if (newTime && !selectedTimes.includes(newTime)) {
    setSelectedTimes([...selectedTimes, newTime]);
    setNewTime('');
  }
};

const handleSaveAvailability = async () => {
  console.log(selectedTimes);
  
  const token = await getToken();
  await api.put(`/setavailability/${user._id}`, {
    date: selectedDate.toISOString().split('T')[0],
    times: Array.from(new Set(selectedTimes)),
  }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  setAvailability((prev) => new Map(prev).set(selectedDate.toISOString().split('T')[0], selectedTimes));
};

const handleRemoveDate = async (date) => {
  const token = await getToken();
  await api.put(`/cancleavailability/${user._id}`, { date }, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  setAvailability((prev) => {
    const updated = new Map(prev);
    updated.delete(date);
    return updated;
  });
};

const handleDeleteTime = (time) => {
  setSelectedTimes(selectedTimes.filter(t => t !== time));
};

const handleFilterChange = (date) => {
  setFilterDate(date);
};

const renderScheduleTable = () => {
  const filteredAvailability = filterDate
    ? new Map([...availability].filter(([key]) => key === filterDate.toISOString().split('T')[0]))
    : availability;

  return (
    <Table className="shadow-md border">
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Times</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from(filteredAvailability.keys()).map(date => (
          <TableRow key={date} className="transition ease-in-out delay-150 duration-200">
            <TableCell>{date}</TableCell>
            <TableCell>{filteredAvailability.get(date).join(', ')}</TableCell>
            <TableCell>
              <button 
                onClick={() => handleRemoveDate(date)} 
                className="text-red-500 hover:text-gray-400 hover:bg-red-700 p-2 rounded transition duration-300"
              >
                <DeleteIcon />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const isDateDisabled = (date) => {
  return date < new Date();
};

return (
  <div className="p-4">
    <h1 className="text-xl font-bold mb-4">Schedule Manager</h1>

    {/* Date Picker for Filtering */}
    <div className="flex flex-wrap gap-12 mb-4">
      <div className='flex flex-col gap-6'>
        <label htmlFor="">Filter By Date : </label>
        <div className="relative">
          <DatePicker
            selected={filterDate}
            onChange={handleFilterChange}
            filterDate={(date) => date >= new Date()}
            placeholderText="Filter by Date"
            className="border p-2 rounded mb-4"
            calendarClassName="rounded-md shadow-lg"
            inline
          />
          {filterDate && (
            <button 
              onClick={() => setFilterDate(null)} 
              className="absolute top-2 right-2 text-red-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      <div className='flex flex-col gap-6'>
        <label htmlFor="">Add Date and Time : </label>
        <div className="relative">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            filterDate={(date) => !isDateDisabled(date)}
            inline
            className="custom-datepicker w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-4"
            calendarClassName="rounded-md shadow-lg"
            dayClassName={(date) => 
              isDateDisabled(date) 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition duration-200'
            }
          />
          {selectedDate && (
            <button 
              onClick={() => setSelectedDate(null)} 
              className="absolute top-2 right-2 text-red-500"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>

    {renderScheduleTable()}

    {/* Dialog for Adding/Editing Times */}
    <Dialog open={!!selectedDate} onOpenChange={() => setSelectedDate(null)}>
      <DialogTrigger asChild>
        <button className="hidden">Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Times for {selectedDate?.toISOString().split('T')[0]}</DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button 
            onClick={handleAddTime} 
            className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
          >
            Add Time
          </button>
        </div>

        <ul className="mb-4">
          {selectedTimes.map((time, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{time}</span>
              <button onClick={() => handleDeleteTime(time)} className="text-red-500"><Trash2/></button>
            </li>
          ))}
        </ul>

        <div className="flex justify-between">
          <button 
            onClick={handleSaveAvailability} 
            className="bg-orange-500 text-white p-2 rounded"
          >
            Save Availability
          </button>
          
        </div>
      </DialogContent>
  </Dialog>
  </div>
);
};

export default ScheduleManager;