import React, { useState } from "react";
import { Calendar } from "../../../../components/ui/Calendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { format, addDays } from "date-fns"; // Add days for date manipulation
import { Delete } from "lucide-react";

const DoctorSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availability, setAvailability] = useState({}); // Tracks available dates
  const [bookedDates, setBookedDates] = useState([]); // Tracks permanently booked dates
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (date) => {
    // Add 1 day to the selected date to fix previous date issue
    const nextDay = addDays(date, 1);
    const formattedDate = format(nextDay, "yyyy-MM-dd");

    // Prevent selecting already booked dates
    if (bookedDates.includes(formattedDate)) {
      return;
    }

    // Update the selected date and open the modal
    setSelectedDate(formattedDate);
    setIsModalOpen(true);
  };

  const toggleAvailability = () => {
    if (!selectedDate) return; // Avoid processing if no date is selected

    // Mark the selected date as available
    setAvailability((prev) => ({
      ...prev,
      [selectedDate]: true,
    }));

    // Close the modal and reset the selected date
    setIsModalOpen(false);
    setSelectedDate(null); // Reset selected date after confirming availability
  };

  const deleteAvailability = (date) => {
    setAvailability((prev) => {
      const updatedAvailability = { ...prev };
      delete updatedAvailability[date]; // Remove availability for the date
      return updatedAvailability;
    });

    // Mark the date as permanently booked and close the modal
    setBookedDates((prev) => [...prev, date]);
    setIsModalOpen(false); // Close the modal after booking
    setSelectedDate(null); // Reset selected date after deleting
  };

  const isDateAvailable = (date) => availability[format(date, "yyyy-MM-dd")];
  const isDateBooked = (date) => bookedDates.includes(format(date, "yyyy-MM-dd"));

  return (
    <div className="p-6 space-y-6 w-full">
      <h1 className="text-xl font-bold">Doctor's Scheduling</h1>
      {/* Calendar */}
      <Calendar
        mode="single"
        selected={selectedDate} // Make sure the selected date is passed as a prop to the Calendar
        onSelect={handleDateClick}
        className="rounded-md border w-fit"
        dayClassName={(date) => {
          const formattedDate = format(date, "yyyy-MM-dd");

          // Styling based on availability and booked dates
          if (bookedDates.includes(formattedDate)) {
            return "bg-red-500 text-white rounded-full cursor-not-allowed"; // Highlight booked dates
          }
          if (availability[formattedDate]) {
            return "bg-green-500 text-white rounded-full cursor-not-allowed"; // Highlight available dates
          }
          if (selectedDate === formattedDate) {
            return "bg-blue-300 text-white rounded-full"; // Highlight selected dates
          }
          return "";
        }}
      />
      {/* Modal for setting availability */}
      {selectedDate && !availability[selectedDate] && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <h2 className="text-lg font-semibold mb-4">
              Set Availability for {format(new Date(selectedDate), "PP")}
            </h2>
            <p>Do you want to mark yourself available on this date?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                className="bg-orange-600 text-white"
                onClick={toggleAvailability}
              >
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      {/* Display Available Dates */}
      <div>
        <h2 className="text-lg font-semibold">Available Dates:</h2>
        {Object.keys(availability).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(availability).map((date) => (
              <div
                key={date}
                className="p-4 border rounded shadow flex justify-between items-center"
              >
                <span>{format(new Date(date), "PP")}</span>
                <Button
                  variant="ghost"
                  onClick={() => {
                    deleteAvailability(date); // Delete availability and book the date
                  }}
                >
                  <Delete />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>No availability set yet.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorSchedule;
