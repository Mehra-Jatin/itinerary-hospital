import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import {
    Button,
} from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Add the correct imports for your components
import { FileX, Calendar, ArrowUpDown, MessageSquareMoreIcon, ContactRound, Users } from "lucide-react"; // Use the correct icon library
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Description } from "@radix-ui/react-dialog";

const AppointmentHistory = ({ userId, Token }) => {
    const [history, setHistory] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tempFilters, setTempFilters] = useState({ dateFrom: "", dateTo: "", status: "all" });
    const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" });
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const historyResponse = await axios.get(`http://localhost:4000/api/v1/history/${userId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Token}`,
                    },
                });
                const historyData = historyResponse.data.history;
                setHistory(historyData);

                const appointmentPromises = historyData.map(async (item) => {
                    const appointmentResponse = await axios.get(`http://localhost:4000/api/v1/appointment/${item.userId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Token}`,
                        },
                    });
                    return appointmentResponse.data.appointment;
                });
                const appointmentData = await Promise.all(appointmentPromises);

                const mergedAppointments = appointmentData.flat().map((appointment) => {
                    const user = historyData.find(item => item.userId === appointment.userId)?.user;
                    return {
                        ...appointment,
                        user,
                        history: historyData.find(item => item.userId === appointment.userId),
                    };
                });

                setAppointments(mergedAppointments);

                const userPromises = mergedAppointments.map(async (appointment) => {
                    const userResponse = await axios.get(`http://localhost:4000/api/v1/user/${appointment.userId}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${Token}`,
                        },
                    });
                    return userResponse.data.user;
                });
                const userData = await Promise.all(userPromises);

                const appointmentsWithUsers = mergedAppointments.map(appointment => {
                    const user = userData.find(user => user.userId === appointment.userId);
                    return {
                        ...appointment,
                        user,
                    };
                });

                setUsers(userData);
                setAppointments(appointmentsWithUsers);
                setIsLoading(false);
            } catch (error) {
                setError("Error fetching data");
                setIsLoading(false);
            }
        };

        fetchHistoryData();
    }, [userId, Token]);

    const filterData = (data) => {
        let filteredData = [...data];

        // Filter by search term
        if (searchTerm) {
            filteredData = filteredData.filter((item) => {
                const fullName = `${item.user?.FirstName} ${item.user?.LastName}`.toLowerCase();
                return fullName.includes(searchTerm.toLowerCase());
            });
        }

        // Date filters
        if (tempFilters.dateFrom) {
            filteredData = filteredData.filter((item) => new Date(item.date) >= new Date(tempFilters.dateFrom));
        }
        if (tempFilters.dateTo) {
            filteredData = filteredData.filter((item) => new Date(item.date) <= new Date(tempFilters.dateTo));
        }
        if (tempFilters.status !== "all") {
            filteredData = filteredData.filter((item) => item.appointmentStatus === tempFilters.status);
        }

        return filteredData;
    };

    const sortData = (data, sortConfig) => {
        return [...data].sort((a, b) => {
            let aValue = a[sortConfig.key];
            let bValue = b[sortConfig.key];

            // Handle nested fields like "user.FirstName"
            if (sortConfig.key === "user") {
                aValue = a.user?.FirstName?.toLowerCase() + " " + a.user?.LastName?.toLowerCase() || "";
                bValue = b.user?.FirstName?.toLowerCase() + " " + b.user?.LastName?.toLowerCase() || "";
            }

            if (aValue < bValue) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (aValue > bValue) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    };

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedData = sortData(filterData(appointments), sortConfig);

    return (
        <div className="p-4 md:p-6 shadow-orange-200 shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Appointment History</h2>
                <Button onClick={() => fetchHistoryData()} className="bg-primary text-white">Refresh</Button>
            </div>

            {/* Search and Filters */}
            <div className="flex justify-between items-center mb-4 flex-wrap gap-5 w-full">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border rounded p-2 w-full shadow-md "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2 flex-wrap">
                 
                 
                  <div className="flex flex-col gap-2">
                  <label htmlFor="DateFrom">Date From  </label>
                    <input id="DateFrom"
                        type="date"
                        className="border rounded p-2"
                        value={tempFilters.dateFrom}
                        onChange={(e) => setTempFilters({ ...tempFilters, dateFrom: e.target.value })}
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                     <label htmlFor="DateTo">Date To  </label>
                    <input
                        type="date"
                        className="border rounded p-2"
                        value={tempFilters.dateTo}
                        onChange={(e) => setTempFilters({ ...tempFilters, dateTo: e.target.value })}
                    />
                     </div> 
                     <div className="flex flex-col gap-2">
                     <label htmlFor="status">Status  </label>
                    <select id="status"
                        className="border rounded p-2"
                        value={tempFilters.status}
                        onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
                    >
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                    </select></div>
                </div>
            </div>

            {isLoading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            ) : error ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-red-600">Error Loading History</h3>
                        <p className="text-gray-600">{error}</p>
                        <Button onClick={() => fetchHistoryData()} className="mt-4 bg-primary">
                            Retry
                        </Button>
                    </Card>
                </div>
            ) : filteredAndSortedData.length === 0 ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <Card className="p-6 text-center">
                        <FileX className="w-12 h-12 text-gray-400 mx-auto" />
                        <h3 className="text-lg font-semibold">No appointments found</h3>
                        <p className="text-gray-500">Try adjusting filters or refresh the page.</p>
                    </Card>
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0 ">
                        <Table className=''>
                            <TableHeader>
                                <TableRow>
                                    <TableHead onClick={() => requestSort("date")} className="cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Date
                                            <ArrowUpDown className="w-4 h-4" />
                                        </div>
                                    </TableHead>
                                    <TableHead onClick={() => requestSort("user")} className="cursor-pointer"> 
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 ```javascript
                                            h-4" />
                                            User Name
                                            <ArrowUpDown className="w-4 h-4" />
                                        </div>
                                    </TableHead>
                                    <TableHead onClick={() => requestSort("age")} className="cursor-pointer"> 
                                        <div className="flex items-center gap-2">
                                            <ContactRound className="w-4 h-4" />
                                            Age
                                            <ArrowUpDown className="w-4 h-4" />
                                        </div>
                                    </TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredAndSortedData.map((item, index) => {
                                    return (
                                        <Dialog key={item._id}>
                                            <DialogTrigger asChild aria-setsize={18}>
                                                <TableRow className="cursor-pointer transition ease-in-out delay-150 hover:scale-105 hover:bg-orange-500 duration-200 hover:text-white">
                                                    <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                                                    <TableCell>{item.user?.FirstName} {item.user?.LastName}</TableCell>
                                                    <TableCell>{item.user.age}</TableCell>
                                                    <TableCell>
                                                        <span
                                                            className={`px-2 py-1 rounded text-sm font-medium ${
                                                                item.appointmentStatus === "pending"
                                                                    ? "bg-yellow-100 text-yellow-800"
                                                                    : item.appointmentStatus === "confirmed"
                                                                        ? "bg-green-100 text-green-800"
                                                                        : item.appointmentStatus === "cancelled"
                                                                            ? "bg-red-100 text-red-800"
                                                                            : "bg-gray-100 text-gray-800"
                                                            }`}
                                                        >
                                                            {item.appointmentStatus}
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            </DialogTrigger>
                                            <DialogContent className='fixed overflow-auto bg-white p-4 rounded-lg max-h-[90vh] w-full sm:w-[600px]'>
                                                <DialogHeader>
                                                    <DialogTitle className='text-center mb-3 text-xl'>History</DialogTitle>
                                                </DialogHeader>
                                                <div className="flex flex-col gap-3 ">
                                                    <Card className='bg-orange-200'>
                                                        <CardHeader className='text-md font-medium text-center'>Patient's Details</CardHeader>
                                                        <CardContent>
                                                            <p><strong>FullName:</strong> {item.user?.FirstName} {item.user?.LastName}</p>
                                                            <p><strong>Age :</strong> {item.user.age}</p>
                                                            <p><strong>PhoneNo :</strong> {item.user.PhoneNo}</p>
                                                            <p><strong>Email :</strong> {item.user.email}</p>
                                                            <p><strong>Gender :</strong> {item.user.gender}</p>
                                                            <Description>
                                                                <p><strong>Description:</strong> {item.history?.description}</p>
                                                                <p><strong>Prescription:</strong> {item.history?.prescription}</p>
                                                            </Description>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className='bg-orange-200'>
                                                        <CardHeader className='text-md font-medium text-center'>Appointment's Details</CardHeader>
                                                        <CardContent>
                                                            <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                                            <p><strong>Chats:</strong> {item.chat ? "User  Can Chat With you" : "User  Can Not Chat With You"}</p>
                                                            <p><strong>Time:</strong> {item.time}</p>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className='bg-orange-200'>
                                                        <CardHeader className='text-md font-medium text-center'>Histories's Details</CardHeader>
                                                        <CardContent>
                                                            <Description>
                                                                <p><strong>Description:</strong> {item.history?.description}</p>
                                                                <p><strong>Prescription:</strong> {item.history?.prescription}</p>
                                                            </Description>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                                {item.chat ? (
                                                    <div className="flex justify-center mt-4 gap-2 bg-orange-500 p-2 rounded-lg items-center hover:bg-orange-600 transition-all duration-300 ease-in-out cursor-pointer">
                                                        <MessageSquareMoreIcon className="text-white w-5 h-5" />
                                                        <div className="text-white font-medium">Chats</div>
                                                    </div>
                                                ) : ""}
                                            </DialogContent>
                                        </Dialog>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default AppointmentHistory;