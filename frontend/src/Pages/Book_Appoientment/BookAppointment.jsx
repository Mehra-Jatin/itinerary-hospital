import React, { useState } from 'react';
import { format, parse } from 'date-fns';
import DoctorInfo from './components/DoctorInfo';
import DatePicker from './components/DatePicker';
import TimeSlots from './components/TimeSlots';
import ConfirmationModal from './components/ConfirmationModal';
import { useAuth } from '@/hooks/useAuth';
import { usePatient } from '@/contexts/PatientContext';
import { useDoctor } from '@/contexts/DoctorContext';
import { useParams, Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const BookAppointment = () => {
  const { doctors, loading, error } = useDoctor();
  const { user } = useAuth();
  const { BookAppointment } = usePatient();
  const { id } = useParams();
  const { toast } = useToast();
  
  // If user is not a patient, show an error message or redirect
  // if (user.role !== 'patient') {
  //   toast({
  //     title: "Unauthorized Access",
  //     description: "You are not allowed to book appointments. Only patients can book appointments.",
  //     variant: "destructive",
  //   });
  //   return <Navigate to="/" replace />;
  // }

  const doctor = doctors.find((doc) => doc._id === id) || {
    FirstName: 'Unknown',
    LastName: 'Doctor',
    profileDescription: 'No profile description available.',
    specialization: 'General Medicine',
    hospital: 'Unknown Hospital',
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleTimeSelect = (slot) => {
    setSelectedSlot(slot);
    setShowConfirmation(true);
  };

  const handleBookingConfirm = async () => {
    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const formattedTime = format(parse(selectedSlot.time, 'h:mm a', new Date()), 'HH:mm');

      const formData = {
        doctorId: doctor._id,
        userId: user._id,
        date: formattedDate,
        time: formattedTime
      };

      const response = await BookAppointment(formData);
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully booked.",
        variant: "default",
      });
      setShowConfirmation(false);
      // Reset state or redirect user
    } catch (err) {
      toast({
        title: "Booking Failed",
        description: err.message || "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto min-h-[70vh] mt-10 p-4 max-w-7xl">
      <div className="grid md:grid-cols-3 gap-6">
        <DoctorInfo doctor={doctor} />
        <div className="md:col-span-2 space-y-6">
          <DatePicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />
          {selectedDate && (
            <TimeSlots
              selectedSlot={selectedSlot}
              onTimeSelect={handleTimeSelect}
            />
          )}
        </div>
      </div>
      {showConfirmation && (
        <ConfirmationModal
          doctor={doctor}
          date={selectedDate}
          time={selectedSlot}
          onConfirm={handleBookingConfirm}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
};

export default BookAppointment;