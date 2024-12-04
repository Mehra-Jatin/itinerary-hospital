import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const DatePicker = ({ onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (date) => {
    if (!isPastDate(date)) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const isPast = isPastDate(date);

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          disabled={isPast}
          className={`flex items-center justify-center p-2 rounded-md sm:w-16 sm:h-10 w-8 h-8 transition-colors 
            ${isToday(date) ? 'bg-orange-100 text-orange-800' : ''} 
            ${isSelected ? 'bg-orange-500 text-white hover:text-black hover:bg-orange-800' : ''} 
            ${isPast ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-orange-100'}`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };

  return (
    <div>
      <CardHeader className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-white">
          <CalendarIcon className="w-6 h-6" />
          <span className="text-xl font-bold tracking-wide">Select a Date</span>
        </CardTitle>
      </CardHeader>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex space-x-2">
            <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-100">
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {DAYS.map(day => (
            <div key={day} className="text-center font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2 place-items-center">
          {renderCalendar()}
        </div>
        {selectedDate && (
          <div className="mt-4 text-center text-gray-700">
            Selected Date: {selectedDate.toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;