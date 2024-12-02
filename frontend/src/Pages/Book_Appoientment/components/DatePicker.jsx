import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarIcon } from 'lucide-react';

const DatePicker = ({ selectedDate, onDateSelect }) => {
  const [month, setMonth] = useState(new Date());

  return (
    <Card className="w-full max-w-md shadow-lg border-none">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-white">
          <CalendarIcon className="w-6 h-6" />
          <span className="text-xl font-bold tracking-wide">Select a Date</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          month={month}
          onMonthChange={setMonth}
          disabled={(date) => date < new Date() || date.getDay() === 0}
          className="w-full"
          cellClassName="p-3 rounded-md hover:bg-orange-100 transition-colors"
          todayClassName="border-2 border-orange-500 font-bold text-orange-500"
          selectedClassName="bg-orange-500 text-white font-bold"
          weekendClassName="text-red-500"
          disabledClassName="text-gray-400 line-through"
        />
        {selectedDate && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Selected Date: {format(selectedDate, 'PPP')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DatePicker;