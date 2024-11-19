import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Appointment() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const doctorAvailableDates = [
    new Date("2024-11-20"),
    new Date("2024-11-21"),
    new Date("2024-11-25"),
    new Date("2024-11-27"),
    new Date("2024-11-28"),
    new Date("2024-11-29"),
    new Date("2024-11-22"),
  ];

  const isAvailableDate = (date) =>
    doctorAvailableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.getDate() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getFullYear() === date.getFullYear()
    );


  const handleDateChange = (date) => {
    if (isAvailableDate(date)) {
      setSelectedDate(date);
      showTimesForDate(date);
    } else {
      alert("This date is not available for booking.");
    }
  };

  const showTimesForDate = () => {
    setAvailableTimes([
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ]);
    setSelectedTime(null);
    setIsBookingConfirmed(false);
  };

  const handleTimeSelect = (time) => setSelectedTime(time);

  const handleBookingConfirmation = () => {
    if (selectedTime) setIsBookingConfirmed(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-orange-100 to-orange-200 p-6">
      <button
        className="mb-8 px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-500 text-white font-extrabold text-xl rounded-sm shadow-xl hover:scale-105 transition-transform duration-300"
      >
        {"Book Appointment"}
      </button>
   
        <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
            Select a Date for Your Appointment
          </h2>
          <div className="flex justify-center">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              inline
              filterDate={isAvailableDate}
              className="border-2 border-gray-300 rounded-lg shadow-lg p-4 bg-gray-50 hover:shadow-2xl transition duration-300 ease-in-out"
              calendarClassName="custom-calendar"
            />
          </div>

          {selectedDate && (
            <div className="mt-8">
              <p className="text-lg text-gray-800 font-semibold text-center">
                Selected Date:{" "}
                <span className="text-orange-500">
                  {selectedDate.toLocaleDateString()}
                </span>
              </p>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  Available Time Slots
                </h3>
                <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {availableTimes.map((time, index) => (
                    <li key={index}>
                      <button
                        onClick={() => handleTimeSelect(time)}
                        className={`w-full px-6 py-3 rounded-lg text-center transition-transform duration-200 text-lg font-medium ${
                          selectedTime === time
                            ? "bg-green-500 text-white transform scale-105"
                            : "bg-gray-200 hover:bg-gray-300"
                        }`}
                      >
                        {time}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedTime && !isBookingConfirmed && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleBookingConfirmation}
                    className="px-10 py-4 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 shadow-lg transition-transform duration-300"
                  >
                    Confirm Booking
                  </button>
                </div>
              )}
            </div>
          )}

          {isBookingConfirmed && (
            <div className="mt-8 p-6 bg-green-100 rounded-lg text-green-700 text-center">
              <p className="text-lg font-semibold">
                Booking Confirmed for{" "}
                <span className="text-green-800">{selectedTime}</span> on{" "}
                <span className="text-green-800">
                  {selectedDate.toLocaleDateString()}
                </span>
                !
              </p>
            </div>
          )}
        </div>
    </div>
  );
}

export default Appointment;

