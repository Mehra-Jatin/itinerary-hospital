import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { parse, format } from "date-fns";

const TimeSlots = ({ selectedSlot, onTimeSelect }) => {
  const timeSlots = [
    { id: 1, time: "09:00 AM", available: true },
    { id: 2, time: "10:00 AM", available: true },
    { id: 3, time: "11:00 AM", available: true },
    { id: 4, time: "12:00 PM", available: true },
    { id: 6, time: "03:00 PM", available: true },
    { id: 7, time: "04:00 PM", available: true },
    { id: 8, time: "05:00 PM", available: true },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Select Time
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.id}
              className={`h-12 w-full ${
                selectedSlot?.id === slot.id ? "bg-orange-500 text-white" : "border"
              }`}
              disabled={!slot.available}
              onClick={() => onTimeSelect(slot)}
            >
              {format(parse(slot.time, "hh:mm a", new Date()), "h:mm a")}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSlots;
