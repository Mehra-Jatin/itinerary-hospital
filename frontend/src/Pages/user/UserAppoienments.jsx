import React, { useState, useEffect, useMemo } from 'react';
import { format, isToday, isAfter } from 'date-fns';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MoreVertical, ChevronLeft, ChevronRight, User, X, ArrowRight } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useDoctor } from '@/contexts/DoctorContext';
import { usePatient } from '@/contexts/PatientContext';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import ChatNowButton from './components/ChatNowButton';

const ITEMS_PER_PAGE = 6;

const AppointmentCard = ({ appointment, doctors, onReschedule, onCancel }) => {
    const doctor = doctors.find(doc => doc._id === appointment.doctorId);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            case 'completed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div
            className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 
                transition-all duration-300 hover:shadow-md hover:border-orange-200 mb-4"
        >
            <div className="flex justify-between items-start">
                <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                        <User className="w-5 h-5 text-orange-600" />
                        <h3 className="font-semibold text-xl capitalize">
                            Dr. {doctor ? `${doctor.FirstName} ${doctor.LastName}` : 'Unknown'}
                        </h3>
                        <span className='text-sm italic text-gray-400'>
                            {doctor && doctor.specialization}
                        </span>
                    </div>

                    <div className="flex items-center space-x-6 text-sm">
                        <div className="flex items-center space-x-2 text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full">
                            <Clock className="w-4 h-4" />
                            <span>{appointment.time}</span>
                        </div>
                        <div
                            className="flex items-center space-x-2 text-lg font-semibold bg-gray-100 px-3 py-1 rounded-full"
                            title='Date: MM/DD/YYYY'
                        >
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.appointmentStatus)}`}>
                        {appointment.appointmentStatus.charAt(0).toUpperCase() + appointment.appointmentStatus.slice(1)}
                    </span>
                    <ChatNowButton
                        appointment={appointment}
                        doctor={doctor}
                    />
                </div>

                <div className="flex items-center space-x-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48">
                            <DropdownMenuItem
                                onClick={() => onReschedule(appointment._id)}
                                className="text-orange-600 focus:text-orange-700 focus:bg-orange-50"
                            >
                                <Calendar className="w-4 h-4 mr-2" />
                                Reschedule
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onCancel(appointment._id)}
                                className="text-red-600 focus:text-red-700 focus:bg-red-50"
                            >
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

const PatientAppointmentsDashboard = () => {
    const [bookedAppointments, setBookedAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useAuth();
    const { doctors } = useDoctor();
    const { fetchAppointment } = usePatient();

    useEffect(() => {
        const loadAppointments = async () => {
            try {
                setLoading(true);
                const appointmentsResponse = await fetchAppointment(user._id);

                setBookedAppointments(
                    Array.isArray(appointmentsResponse)
                        ? appointmentsResponse
                        : appointmentsResponse.appointments || []
                );
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            loadAppointments();
        }
    }, [user, fetchAppointment]);

    const todaysAppointments = useMemo(() =>
        bookedAppointments.filter(
            apt => isToday(new Date(apt.date)) && apt.appointmentStatus !== 'cancelled'
        ),
        [bookedAppointments]
    );

    const upcomingAppointments = useMemo(() =>
        bookedAppointments.filter(
            apt => isAfter(new Date(apt.date), new Date()) &&
                apt.appointmentStatus !== 'cancelled' &&
                !isToday(new Date(apt.date))
        ).sort((a, b) => new Date(a.date) - new Date(b.date)),
        [bookedAppointments]
    );

    const handleReschedule = (appointmentId) => {
        // Implement reschedule logic
        console.log('Reschedule appointment:', appointmentId);
    };

    const handleCancel = (appointmentId) => {
        // Implement cancel logic
        console.log('Cancel appointment:', appointmentId);
    };

    if (loading) {
        return <div>Loading appointments...</div>;
    }

    if (error) {
        return <div>Error loading appointments: {error}</div>;
    }

    if (bookedAppointments.length === 0) {
        return (
            <div className="bg-gradient-to-b from-orange-50 to-white">
                <div className="max-w-4xl mx-auto pt-16 px-4">
                    <div className="text-center">
                        <Calendar className="w-20 h-20 text-orange-400 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold text-orange-800 mb-4">No Appointments Found</h2>
                        <p className="text-orange-600 mb-8 max-w-md mx-auto">
                            You don't have any appointments scheduled. Would you like to book a new appointment?
                        </p>
                        <Link to="/doctor">
                            <Button
                                variant="outline"
                                className="relative overflow-hidden px-8 py-2 rounded-full 
                                transition-all duration-300 transform hover:shadow-lg group"
                            >
                                <span className="relative z-10 flex items-center gap-5">
                                    <span>Schedule New Appointment</span>
                                    <ArrowRight className="group-hover:flex hidden transition duration-150" />
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-orange-800">Your Appointments</h1>
                    <Link to="/doctor">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-6">
                            Book New
                        </Button>
                    </Link>
                </div>

                {/* Today's Appointments Section */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Calendar className="mr-2 h-6 w-6 text-orange-600" /> Today's Appointments
                    </h2>
                    {todaysAppointments.length === 0 ? (
                        <p className="text-muted-foreground">No appointments for today</p>
                    ) : (
                        todaysAppointments.map(apt => (
                            <AppointmentCard
                                key={apt._id}
                                appointment={apt}
                                doctors={doctors}
                                onReschedule={handleReschedule}
                                onCancel={handleCancel}
                            />
                        ))
                    )}
                </section>

                {/* Upcoming Appointments Section */}
                <section>
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <Calendar className="mr-2 h-6 w-6 text-orange-600" /> Upcoming Appointments
                    </h2>
                    {upcomingAppointments.length === 0 ? (
                        <p className="text-muted-foreground">No upcoming appointments</p>
                    ) : (
                        upcomingAppointments.map(apt => (
                            <AppointmentCard
                                key={apt._id}
                                appointment={apt}
                                doctors={doctors}
                                onReschedule={handleReschedule}
                                onCancel={handleCancel}
                            />
                        ))
                    )}
                </section>
            </div>
        </div>
    );
};

export default PatientAppointmentsDashboard;