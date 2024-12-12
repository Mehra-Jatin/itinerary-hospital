import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserCheck, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { useAdmin } from "@/contexts/AdminContext";

const getInitials = (name = "") => {
    const names = name.split(" ");
    if (names.length === 1) {
        return name.charAt(0).toUpperCase();
    }
    return `${names[0].charAt(0).toUpperCase()}${names[1].charAt(0).toUpperCase()}`;
};

const AdminDashboard = () => {
    const {
        Patients = [],
        fetchPatients,
        doctors = [],
        fetchDoctors,
        verifiedDoctors = [],
        fetchVerifiedDoctors,
        Appointments = [],
        fetchAllAppointments,
        handleValidation,
        allDoctors,
        fetchAllDoctors,
    } = useAdmin() || {};

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
        fetchVerifiedDoctors();
        fetchAllAppointments();
        fetchAllDoctors();
    }, []);

    // console.log(allDoctors);
    

    const navigate = useNavigate();

    // Calculate stats dynamically with default values
    const stats = [
        {
            name: "Total Patients",
            value: Patients.length || 0,
            icon: Users
        },
        {
            name: "Verified Doctors",
            value: `${verifiedDoctors.length || 0}`,
            subText: `${doctors.filter(doc => !doc.verified).length || 0} Unverified`,
            icon: UserCheck
        },
        {
            name: "Appointments",
            value: Appointments.length || 0,
            icon: Calendar
        },
        {
            name: "Total Earnings",
            value: `$${Appointments.reduce((total, app) => total + (app.price || 0), 0).toLocaleString()}`,
            icon: DollarSign
        }
    ];

    // need to fixed in the future
    
    const getDoctorDetails = (doctorId) => {
        const doctor = allDoctors.find(doc => String(doc._id) === String(doctorId));
        // console.log('doctor',doctor);
        
        return doctor ? {
            name: doctor.FirstName || doctor.name || 'Unknown Doctor',
            specialty: doctor.specialization || 'Unspecified'
        } : { name: 'Unknown Doctor', specialty: 'Unspecifiedddddddddddddddddd' };
    };

    // Enhanced patient details retrieval
    const getPatientDetails = (patientId) => {
        const patient = Patients.find(patient => patient.id === patientId);
        
        // console.log('patient',patient);
        
        return patient ? {
            name: patient.FirstName || 'Unknown Patient',
            age: patient.age || 'N/A'
        } : { name: 'Unknown Patient', age: 'N/A' };
    };

    // Enhanced appointments with comprehensive details
    const enhancedAppointments = Appointments.map(appointment => {
        const doctorDetails = getDoctorDetails(appointment.doctorId);
        const patientDetails = getPatientDetails(appointment.patientId);

        return {
            ...appointment,
            doctorName: doctorDetails.name,
            doctorSpecialty: doctorDetails.specialty,
            patientName: patientDetails.name,
            patientAge: patientDetails.age
        };
    });

    // console.log('enhanced',enhancedAppointments);
    

    return (
        <div className="p-4 sm:p-6">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6">Admin Dashboard</h1>

                {/* Stats Section */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs sm:text-sm font-medium text-slate-600 truncate">
                                    {stat.name}
                                </CardTitle>
                                <stat.icon className="h-4 w-4 text-slate-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg sm:text-2xl font-bold text-slate-900">{stat.value}</div>
                                {stat.subText && (
                                    <p className="text-xs text-slate-500 mt-1">{stat.subText}</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Doctors to Verify Section */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-slate-800">Doctors to Verify</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {doctors.filter(doc => doc && !doc.verified).map((doctor) => (
                                <div key={doctor.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow">
                                    <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
                                        <Avatar>
                                            <AvatarFallback className="text-sm">
                                                {getInitials(doctor.FirstName || "Unnamed Doctor")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-center sm:text-left">
                                            <p className="font-medium text-slate-900 text-sm sm:text-base">
                                                {doctor.FirstName || 'Unnamed Doctor'}
                                            </p>
                                            <p className="text-xs sm:text-sm text-slate-600">
                                                {doctor.specialization || 'No specialization'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button  onClick={() => handleValidation(doctor.id, 'verify')} size="sm" className="bg-green-500 hover:bg-green-600 text-xs sm:text-sm">
                                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Verify
                                        </Button>
                                        <Button  onClick={() => handleValidation(doctor.id, 'reject')} size="sm" variant="destructive" className="text-xs sm:text-sm">
                                            <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full mt-4 flex items-center justify-center">
                            <Button
                                onClick={() => navigate('/admin-dashboard/verify-doctors')}
                                variant="outline"
                                className="w-full sm:w-1/2 md:w-1/4 bg-slate-50 hover:bg-slate-600 py-4 sm:py-6 group"
                            >
                                <span className="text-sm sm:text-base text-slate-700 group-hover:text-white">View All</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Patients Section */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-slate-800">Recent Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[150px] sm:h-[200px]">
                            <div className="space-y-3 sm:space-y-4">
                                {Patients.slice(0, 5).map((patient) => (
                                    <div key={patient.id} className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow">
                                        <div className="flex items-center space-x-2 sm:space-x-4">
                                            <Avatar>
                                                <AvatarFallback className="text-sm">
                                                    {getInitials(patient.FirstName || "Unnamed Patient")}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-slate-900 text-sm sm:text-base">
                                                    {patient.FirstName || 'Unnamed Patient'}
                                                </p>
                                                <p className="text-xs sm:text-sm text-slate-600">
                                                    Age: {patient.age || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs sm:text-sm text-slate-600 border-slate-600">
                                            Last Visit: {patient.lastVisit || 'No Recent Visit'}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="w-full mt-4 flex items-center justify-center">
                            <Button
                                onClick={() => navigate('/admin-dashboard/manage-patients')}
                                variant="outline"
                                className="w-full sm:w-1/2 md:w-1/4 bg-slate-50 hover:bg-slate-600 py-4 sm:py-6 group"
                            >
                                <span className="text-sm sm:text-base text-slate-700 group-hover:text-white">View All</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Live Appointments Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-slate-800 flex items-center">
                            <Calendar className="mr-2 h-5 w-5" /> Live Appointments
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {enhancedAppointments.slice(0, 5).map((appointment) => (
                                <div 
                                    key={appointment.id} 
                                    className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow"
                                >
                                    <div className="mb-2 sm:mb-0 text-center sm:text-left">
                                        <p className="font-medium text-slate-900 text-sm sm:text-base">
                                            Dr. {appointment.doctorName}
                                        </p>
                                        <p className="text-xs sm:text-sm text-slate-600">
                                            {appointment.doctorSpecialty}
                                        </p>
                                    </div>
                                    <div className="text-center sm:text-right mb-2 sm:mb-0">
                                        <p className="font-medium text-slate-900 text-sm sm:text-base">
                                            {appointment.patientName}
                                        </p>
                                        <p className="text-xs sm:text-sm text-slate-600">
                                            Age: {appointment.patientAge}
                                        </p>
                                    </div>
                                    <div className="text-center sm:text-right">
                                        <p className="font-medium text-slate-900 text-sm sm:text-base">
                                            {appointment.date || 'No Date'}
                                        </p>
                                        <p className="text-xs sm:text-sm text-slate-600">
                                            {appointment.time || 'No Time'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full mt-4 flex items-center justify-center">
                            <Button
                                onClick={() => navigate('/admin-dashboard/manage-appointments')}
                                variant="outline"
                                className="w-full sm:w-1/2 md:w-1/4 bg-slate-50 hover:bg-slate-600 py-4 sm:py-6 group"
                            >
                                <span className="text-sm sm:text-base text-slate-700 group-hover:text-white">View All</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboard;