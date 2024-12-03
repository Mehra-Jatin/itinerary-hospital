import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserCheck, Calendar, DollarSign, CheckCircle, XCircle } from 'lucide-react';
import { stats, doctorsToVerify, recentPatients, liveAppointments } from "../components/staticData";

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    return (
        <div className="p-4 sm:p-6">
            <div className="container mx-auto max-w-7xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-orange-800 mb-4 sm:mb-6">Admin Dashboard</h1>
                
                {/* Stats Section - More responsive grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-6">
                    {stats.map((stat, index) => (
                        <Card key={index} className="bg-white">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xs sm:text-sm font-medium text-orange-600 truncate">
                                    {stat.name}
                                </CardTitle>
                                {index === 0 && <Users className="h-4 w-4 text-orange-600" />}
                                {index === 1 && <UserCheck className="h-4 w-4 text-orange-600" />}
                                {index === 2 && <Calendar className="h-4 w-4 text-orange-600" />}
                                {index === 3 && <DollarSign className="h-4 w-4 text-orange-600" />}
                            </CardHeader>
                            <CardContent>
                                <div className="text-lg sm:text-2xl font-bold text-orange-900">{stat.value}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Doctors to Verify Section */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-orange-800">Doctors to Verify</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {doctorsToVerify.map((doctor) => (
                                <div key={doctor.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow">
                                    <div className="flex items-center space-x-2 sm:space-x-4 mb-2 sm:mb-0">
                                        <Avatar>
                                            <AvatarFallback className="text-sm">{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div className="text-center sm:text-left">
                                            <p className="font-medium text-orange-900 text-sm sm:text-base">{doctor.name}</p>
                                            <p className="text-xs sm:text-sm text-orange-600">{doctor.specialty}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-xs sm:text-sm">
                                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> Verify
                                        </Button>
                                        <Button size="sm" variant="destructive" className="text-xs sm:text-sm">
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
                                className="w-full sm:w-1/2 md:w-1/4 bg-orange-50 hover:bg-orange-600 py-4 sm:py-6 group"
                            >
                                <span className="text-sm sm:text-base text-orange-700 group-hover:text-white">View All</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Patients Section */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-orange-800">Recent Patients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[150px] sm:h-[200px]">
                            <div className="space-y-3 sm:space-y-4">
                                {recentPatients.map((patient) => (
                                    <div key={patient.id} className="flex items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow">
                                        <div className="flex items-center space-x-2 sm:space-x-4">
                                            <Avatar>
                                                <AvatarFallback className="text-sm">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium text-orange-900 text-sm sm:text-base">{patient.name}</p>
                                                <p className="text-xs sm:text-sm text-orange-600">Age: {patient.age}</p>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="text-xs sm:text-sm text-orange-600 border-orange-600">
                                            Last Visit: {patient.lastVisit}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="w-full mt-4 flex items-center justify-center">
                            <Button 
                                onClick={() => navigate('/admin-dashboard/manage-patients')} 
                                variant="outline" 
                                className="w-full sm:w-1/2 md:w-1/4 bg-orange-50 hover:bg-orange-600 py-4 sm:py-6 group"
                            >
                                <span className="text-sm sm:text-base text-orange-700 group-hover:text-white">View All</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Live Appointments Section */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg sm:text-xl text-orange-800">Live Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {liveAppointments.map((appointment) => (
                                <div key={appointment.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow">
                                    <div className="mb-2 sm:mb-0 text-center sm:text-left">
                                        <p className="font-medium text-orange-900 text-sm sm:text-base">{appointment.doctor}</p>
                                        <p className="text-xs sm:text-sm text-orange-600">{appointment.patient}</p>
                                    </div>
                                    <div className="text-center sm:text-right">
                                        <p className="font-medium text-orange-900 text-sm sm:text-base">{appointment.date}</p>
                                        <p className="text-xs sm:text-sm text-orange-600">{appointment.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full mt-4 flex items-center justify-center">
                            <Button 
                                onClick={() => navigate('/admin-dashboard/manage-appointments')} 
                                variant="outline" 
                                className="w-full sm:w-1/2 md:w-1/4 bg-orange-50 hover:bg-orange-600 py-4 sm:py-6 group"
                            >
                                <span className="text-sm sm:text-base text-orange-700 group-hover:text-white">View All</span>
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