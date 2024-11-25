import React, { useState } from "react";
import { Calendar } from "../../../../components/ui/Calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Delete, Edit } from "lucide-react";

const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availability, setAvailability] = useState({});

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const isSlotConflicting = (newSlot) => {
    const existingSlots = availability[selectedDate]
      ? availability[selectedDate]
      : [];
    return existingSlots.some(
      (slot) =>
        (newSlot.start >= slot.start && newSlot.start < slot.end) || // Overlapping start
        (newSlot.end > slot.start && newSlot.end <= slot.end) || // Overlapping end
        (newSlot.start <= slot.start && newSlot.end >= slot.end) // Enclosing an existing slot
    );
  };

  const addTimeSlot = (start, end) => {
    const newSlot = { start, end };
    if (isSlotConflicting(newSlot)) {
      alert("This time slot overlaps with an existing one!");
      return;
    }

    setAvailability((prev) => {
      const slots = prev[selectedDate] || [];
      return {
        ...prev,
        [selectedDate]: [...slots, newSlot],
      };
    });
  };

  const deleteTimeSlot = (index) => {
    setAvailability((prev) => {
      const slots = prev[selectedDate] || [];
      const updatedSlots = slots.filter((_, i) => i !== index);
      return { ...prev, [selectedDate]: updatedSlots };
    });
  };

  const editTimeSlot = (index, newStart, newEnd) => {
    const newSlot = { start: newStart, end: newEnd };
    if (isSlotConflicting(newSlot)) {
      alert("This time slot overlaps with an existing one!");
      return;
    }

    setAvailability((prev) => {
      const slots = prev[selectedDate] || [];
      slots[index] = newSlot;
      return { ...prev, [selectedDate]: [...slots] };
    });
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <h1 className="text-xl font-bold">Doctor's Scheduling</h1>
      {/* Calendar */}
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateClick}
        className="rounded-md border w-fit"
      />
      {/* Time Slot Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary" disabled={!selectedDate} className={`bg-orange-500 text-white ${selectedDate || 'cursor-not-allowed'}`}>
            Add Time Slots
          </Button>
        </DialogTrigger>
        <DialogContent>
          <h2 className="text-lg font-semibold mb-4">
            Set Time Slots for {selectedDate ? format(selectedDate, "PP") : ""}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const start = formData.get("start");
              const end = formData.get("end");
              addTimeSlot(start, end);
            }}
            className="space-y-4"
          >
            <div className="flex space-x-4">
              <input
                type="time"
                name="start"
                required
                className="border rounded-md p-2"
              />
              <input
                type="time"
                name="end"
                required
                className="border rounded-md p-2"
              />
            </div>
            <Button type="submit" variant="outline" className='bg-orange-600 text-white transition duration-200 delay-200'>
              Add Slot
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Display Availability */}
      <div>
        <h2 className="text-lg font-semibold">Scheduled Availability:</h2>
        {selectedDate && availability[selectedDate] ? (
          <ul className="list-disc pl-6 space-y-2">
            {availability[selectedDate].map((slot, index) => (
              <li key={index} className="flex justify-between items-center">
                <span>
                  {slot.start} - {slot.end}
                </span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const newStart = prompt(
                        "Enter new start time (HH:mm):",
                        slot.start
                      );
                      const newEnd = prompt(
                        "Enter new end time (HH:mm):",
                        slot.end
                      );
                      if (newStart && newEnd) {
                        editTimeSlot(index, newStart, newEnd);
                      }
                    }}
                  >
                   <Edit className=""/>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => deleteTimeSlot(index)}
                  >
                    <Delete className="bg"/>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No availability set for this date.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
