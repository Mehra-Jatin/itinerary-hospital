import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Calendar as CalendarIcon,
  Star,
  MapPin,
  Phone,
  Mail,
  User,
  Stethoscope,
  Book
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const BookAppointment = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStep, setBookingStep] = useState('date'); // 'date', 'time', 'confirm'
  const { toast } = useToast();
  const navigate = useNavigate();

  // Temporary mock data
  const doctorInfo = {
    name: "Dr. Sarah Wilson",
    specialty: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
    location: "Medical Center, Floor 3",
    phone: "+1 (555) 123-4567",
    email: "dr.wilson@medical.com",
    about: "Dr. Wilson is a board-certified cardiologist with extensive experience in treating heart conditions. She specializes in preventive cardiology and heart disease management.",
    education: [
      "MD - Johns Hopkins University",
      "Cardiology Fellowship - Mayo Clinic",
      "Board Certified in Cardiovascular Disease"
    ]
  };

  const timeSlots = [
    { id: 1, time: "09:00 AM", available: true },
    { id: 2, time: "10:00 AM", available: true },
    { id: 3, time: "11:00 AM", available: false },
    { id: 4, time: "12:00 PM", available: true },
    { id: 5, time: "02:00 PM", available: true },
    { id: 6, time: "03:00 PM", available: true },
    { id: 7, time: "04:00 PM", available: false },
    { id: 8, time: "05:00 PM", available: true },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setBookingStep('time');
  };

  const handleTimeSelect = (slot) => {
    setSelectedSlot(slot);
    setBookingStep('confirm');
  };

  const handleBookingConfirm = () => {
    toast({
      title: "Appointment Booked",
      description: "Your appointment has been successfully booked.",
    })
    navigate('/profile/appointements');
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Doctor Info Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-8 h-8 text-gray-500" />
              </div>
              <div>
                <CardTitle className="text-xl">{doctorInfo.name}</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Stethoscope className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{doctorInfo.specialty}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="about">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="space-y-4 mt-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    <Star className="w-3 h-3 mr-1" />
                    {doctorInfo.rating}
                  </Badge>
                  <Badge variant="secondary">{doctorInfo.experience}</Badge>
                </div>
                <p className="text-sm text-gray-600">{doctorInfo.about}</p>
                <div>
                  <h4 className="font-semibold mb-2">Education</h4>
                  <ul className="text-sm space-y-2">
                    {doctorInfo.education.map((edu, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1 h-1 rounded-full bg-gray-400 mt-2" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="contact" className="space-y-4 mt-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{doctorInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{doctorInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{doctorInfo.email}</span>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Booking Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Schedule Appointment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Date Selection */}
              <div className={`space-y-4 ${bookingStep !== 'date' && 'hidden'}`}>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-500" />
                  <h3 className="font-semibold">Select Date</h3>
                </div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) =>
                    date < new Date() || date.getDay() === 0
                  }
                  className="rounded-md border"
                />
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div className={`space-y-4 ${bookingStep !== 'time' && 'hidden'}`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <h3 className="font-semibold">Select Time</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                        disabled={!slot.available}
                        onClick={() => handleTimeSelect(slot)}
                        className="h-12"
                      >
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirmation */}
              {selectedSlot && bookingStep === 'confirm' && (
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                    <h3 className="font-semibold">Appointment Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {selectedDate?.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{selectedSlot.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Doctor</p>
                        <p className="font-medium">{doctorInfo.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{doctorInfo.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setBookingStep('date')}
                      className="flex-1"
                    >
                      Change Date & Time
                    </Button>
                    <Button
                      onClick={handleBookingConfirm}
                      className="flex-1"
                    >
                      Confirm Booking
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookAppointment;















// implemented later with logic



// import React, { useState, useEffect } from 'react';
// import { useDoctor } from './DoctorContext';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Calendar } from '@/components/ui/calendar';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Loader2 } from 'lucide-react';
// import api from '@/utils/api';

// const BookAppointment = ({ doctorId }) => {
//   const { doctors, loading: loadingDoctors } = useDoctor();
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [bookingStatus, setBookingStatus] = useState({ loading: false, error: null, success: false });

//   // Fetch doctor details when doctorId changes
//   useEffect(() => {
//     const fetchDoctorDetails = async () => {
//       if (doctorId) {
//         try {
//           const response = await api.get(`/doctors/${doctorId}`);
//           setSelectedDoctor(response.data);
//         } catch (error) {
//           console.error('Error fetching doctor details:', error);
//         }
//       }
//     };

//     fetchDoctorDetails();
//   }, [doctorId]);

//   // Fetch available slots when date is selected
//   const fetchAvailableSlots = async (date) => {
//     if (!selectedDoctor || !date) return;

//     try {
//       const response = await api.get(`/doctors/${selectedDoctor.id}/slots`, {
//         params: {
//           date: date.toISOString().split('T')[0],
//         },
//       });
//       setAvailableSlots(response.data.slots);
//     } catch (error) {
//       console.error('Error fetching slots:', error);
//       setAvailableSlots([]);
//     }
//   };

//   // Handle date selection
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     setSelectedSlot(null);
//     fetchAvailableSlots(date);
//   };

//   // Handle booking confirmation
//   const handleBookAppointment = async () => {
//     if (!selectedDoctor || !selectedDate || !selectedSlot) return;

//     setBookingStatus({ loading: true, error: null, success: false });

//     try {
//       await api.post('/appointments', {
//         doctorId: selectedDoctor.id,
//         date: selectedDate.toISOString().split('T')[0],
//         slotId: selectedSlot.id,
//       });

//       setBookingStatus({
//         loading: false,
//         error: null,
//         success: true,
//       });
//     } catch (error) {
//       setBookingStatus({
//         loading: false,
//         error: error.response?.data?.message || 'Failed to book appointment',
//         success: false,
//       });
//     }
//   };

//   if (loadingDoctors) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <Loader2 className="w-8 h-8 animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <Card className="w-full max-w-4xl mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl font-bold">
//           {selectedDoctor ? `Book Appointment with Dr. ${selectedDoctor.name}` : 'Book Appointment'}
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {selectedDoctor && (
//           <div className="space-y-6">
//             <div className="flex flex-col gap-4">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 <h3 className="font-semibold mb-2">Doctor Information</h3>
//                 <p>Specialization: {selectedDoctor.specialization}</p>
//                 <p>Experience: {selectedDoctor.experience} years</p>
//                 <p>Rating: {selectedDoctor.rating}/5</p>
//               </div>

//               <div>
//                 <h3 className="font-semibold mb-4">Select Date</h3>
//                 <Calendar
//                   mode="single"
//                   selected={selectedDate}
//                   onSelect={handleDateSelect}
//                   disabled={(date) =>
//                     date < new Date() || date.getDay() === 0 // Disable past dates and Sundays
//                   }
//                   className="rounded-md border"
//                 />
//               </div>

//               {selectedDate && availableSlots.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold mb-4">Available Time Slots</h3>
//                   <div className="grid grid-cols-3 gap-3">
//                     {availableSlots.map((slot) => (
//                       <Button
//                         key={slot.id}
//                         variant={selectedSlot?.id === slot.id ? "default" : "outline"}
//                         onClick={() => setSelectedSlot(slot)}
//                         className="h-12"
//                       >
//                         {slot.time}
//                       </Button>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {selectedSlot && (
//                 <Button
//                   onClick={handleBookAppointment}
//                   disabled={bookingStatus.loading}
//                   className="w-full mt-4"
//                 >
//                   {bookingStatus.loading ? (
//                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   ) : (
//                     'Confirm Booking'
//                   )}
//                 </Button>
//               )}

//               {bookingStatus.error && (
//                 <Alert variant="destructive">
//                   <AlertDescription>{bookingStatus.error}</AlertDescription>
//                 </Alert>
//               )}

//               {bookingStatus.success && (
//                 <Alert className="bg-green-50 border-green-200">
//                   <AlertDescription className="text-green-800">
//                     Appointment booked successfully for {selectedDate.toLocaleDateString()} at{' '}
//                     {selectedSlot.time} with Dr. {selectedDoctor.name}
//                   </AlertDescription>
//                 </Alert>
//               )}
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default BookAppointment;