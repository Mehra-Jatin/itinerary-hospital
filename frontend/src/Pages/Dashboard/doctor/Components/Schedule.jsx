import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog';
// import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext';
import { CircleX, MessagesSquareIcon } from 'lucide-react';
import api from '@/utils/api';

const AvailabilityManager = () => {
  const { user, getToken } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduledDates, setScheduledDates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [removeDate, setRemoveDate] = useState(null); // State to hold the date to be removed

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = await getToken();
        const response = await api.get(`/getavailability/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response);
        
        setScheduledDates(response.data.availablity);
      } catch (error) {
        console.error(error);
        setFetchError("Failed to load scheduled dates.");
      }
    };
    fetchAvailability();
  }, [getToken, user]);

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const confirmDateSelection = async () => {
    try {
      const token = await getToken();
      await api.put(
        `/setavailability/${user._id}`,
        { date: selectedDate.toISOString().split('T')[0] },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setScheduledDates((prev) => [...prev, selectedDate.toISOString().split('T')[0]]);
      setIsModalOpen(false);
      setSelectedDate(null);  // Clear the selected date after confirmation
    } catch (error) {
      console.error(error);
      alert("Failed to set the selected date. Please try again.");
    }
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to midnight to compare only the date, not the time
    const formattedDate = date.toISOString().split('T')[0];

    // Disable past dates (before today) and already scheduled dates, but allow today
    return date < today || scheduledDates.includes(formattedDate);
  };

  // Handler to open modal for date removal
  const handleRemoveDate = (date) => {
    setRemoveDate(date);
    setIsModalOpen(true);
  };

  // Confirm removal of the date
  const confirmRemoveDate = async () => {
    try {
      const token = await getToken();
      await api.put(
        `/cancleavailability/${user._id}`,
        { date: removeDate },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setScheduledDates((prev) => prev.filter((date) => date !== removeDate)); // Remove the date from the list
      setIsModalOpen(false);
      setRemoveDate(null);  // Clear the remove date after confirmation
    } catch (error) {
      console.error(error);
      alert("Failed to remove the selected date. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Your Availability</h2>

      {fetchError && <p className="text-red-500">{fetchError}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Date Picker */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">Select a Date:</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => handleSelectDate(date)}
              filterDate={(date) => !isDateDisabled(date)}
              inline
              className="custom-datepicker w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              calendarClassName="rounded-md shadow-xl"
              dayClassName={(date) => 
                isDateDisabled(date) 
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition duration-200'
              }
            />
          </div>
        </div>

        {/* Scheduled Dates */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-2">Scheduled Dates:</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-lg">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {scheduledDates.map((date, index) => (
                  <tr key={index} className="hover:bg-blue-100 transition-colors duration-300">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{date}</td>
                    <td className="border px-4 py-2">
                      <button 
                        onClick={() => handleRemoveDate(date)} 
                        className="text-red-500 hover:text-red-700"
                      >
                        <CircleX />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="bg-white rounded-lg shadow-xl p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md transition-all scale-100 duration-300"
        >
          <DialogTitle className="text-xl font-bold mb-4 text-center">
            {removeDate ? 'Confirm Date Removal' : 'Confirm Date Selection'}
          </DialogTitle>
          <p className="text-center text-lg font-semibold mb-4">
            {removeDate 
              ? `Are you sure you want to remove the date >${removeDate}?`
              : `Do you want to select ${selectedDate?.toLocaleDateString()}?`}
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400  transform transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={() => {
                setIsModalOpen(false);
                setRemoveDate(null);  // Reset removeDate and selectedDate when modal is closed
                setSelectedDate(null);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-orange-600 text-white px-5 py-2 rounded hover:text-orange-400 hover:bg-orange-200 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
              onClick={removeDate ? confirmRemoveDate : confirmDateSelection}
            >
              Confirm
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AvailabilityManager;
