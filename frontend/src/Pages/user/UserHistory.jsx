import React, { useState } from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Input,
} from "@/components/ui/input";
import {
    Button,
} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MessageSquare, ArrowUpDown, Calendar, User, Filter, X, FileX } from "lucide-react";

const UserHistory = () => {
    const historicalData = [
        {
          id: 1,
          patientName: "John Smith",
          doctorName: "Dr. Sarah Wilson",
          date: "2024-03-15",
          time: "10:00",
          status: "completed",
          type: "General Checkup",
          chatHistory: [
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
          ],
        },
        {
          id: 2,
          patientName: "John Smith",
          doctorName: "Dr. Michael Lee",
          date: "2024-03-10",
          time: "14:30",
          status: "cancelled",
          type: "Follow-up",
          chatHistory: [
            { sender: "Dr. Michael Lee", message: "I see you've cancelled the appointment. Would you like to reschedule?", time: "14:00" },
            { sender: "John Smith", message: "Yes, please. Next week would be better.", time: "14:05" },
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
            { sender: "Dr. Sarah Wilson", message: "How are you feeling today?", time: "10:00" },
            { sender: "John Smith", message: "Much better, thank you.", time: "10:01" },
          ],
        },
        {
          id: 3,
          patientName: "John Smith",
          doctorName: "Dr. Lisa Chen",
          date: "2024-03-05",
          time: "11:00",
          status: "rescheduled",
          type: "Consultation",
          chatHistory: [
            { sender: "Dr. Lisa Chen", message: "I need to reschedule our appointment.", time: "09:00" },
            { sender: "John Smith", message: "That's fine, when works best?", time: "09:15" },
          ],
        },
        {
          id: 4,
          patientName: "John Smith",
          doctorName: "Dr. Emily Carter",
          date: "2024-03-20",
          time: "16:00",
          status: "completed",
          type: "Dental Checkup",
          chatHistory: [
            { sender: "Dr. Emily Carter", message: "Your teeth look great! Keep flossing.", time: "16:15" },
            { sender: "John Smith", message: "Thank you, will do!", time: "16:16" },
          ],
        },
        {
          id: 5,
          patientName: "John Smith",
          doctorName: "Dr. Adam Johnson",
          date: "2024-03-25",
          time: "09:30",
          status: "no-show",
          type: "Physiotherapy",
          chatHistory: [
            { sender: "Dr. Adam Johnson", message: "We missed you today, please reach out to reschedule.", time: "10:00" },
            { sender: "John Smith", message: "Apologies, will call soon.", time: "10:05" },
          ],
        },
        {
          id: 6,
          patientName: "John Smith",
          doctorName: "Dr. Emily Carter",
          date: "2024-03-30",
          time: "13:00",
          status: "completed",
          type: "Eye Examination",
          chatHistory: [
            { sender: "Dr. Emily Carter", message: "Your prescription remains unchanged.", time: "13:15" },
            { sender: "John Smith", message: "Great, thank you!", time: "13:16" },
          ],
        },
        {
          id: 7,
          patientName: "John Smith",
          doctorName: "Dr. Michael Lee",
          date: "2024-04-01",
          time: "15:45",
          status: "cancelled",
          type: "Skin Checkup",
          chatHistory: [
            { sender: "Dr. Michael Lee", message: "Would you like to reschedule?", time: "15:00" },
            { sender: "John Smith", message: "Yes, let’s discuss a new date.", time: "15:10" },
          ],
        },
        {
          id: 8,
          patientName: "John Smith",
          doctorName: "Dr. Sarah Wilson",
          date: "2024-04-05",
          time: "11:15",
          status: "completed",
          type: "General Checkup",
          chatHistory: [
            { sender: "Dr. Sarah Wilson", message: "All tests look normal.", time: "11:20" },
            { sender: "John Smith", message: "That’s a relief, thank you!", time: "11:22" },
          ],
        },
        {
          id: 9,
          patientName: "John Smith",
          doctorName: "Dr. Lisa Chen",
          date: "2024-04-08",
          time: "10:30",
          status: "rescheduled",
          type: "Consultation",
          chatHistory: [
            { sender: "Dr. Lisa Chen", message: "I’ve adjusted the time, please confirm.", time: "10:00" },
            { sender: "John Smith", message: "Confirmed, thank you.", time: "10:05" },
          ],
        },
        {
          id: 10,
          patientName: "John Smith",
          doctorName: "Dr. Adam Johnson",
          date: "2024-04-12",
          time: "14:00",
          status: "completed",
          type: "Physiotherapy",
          chatHistory: [
            { sender: "Dr. Adam Johnson", message: "Your progress is great. Keep it up!", time: "14:20" },
            { sender: "John Smith", message: "Thank you so much!", time: "14:22" },
          ],
        },
        {
          id: 11,
          patientName: "John Smith",
          doctorName: "Dr. Sarah Wilson",
          date: "2024-04-15",
          time: "09:00",
          status: "completed",
          type: "General Checkup",
          chatHistory: [
            { sender: "Dr. Sarah Wilson", message: "Your blood pressure has improved.", time: "09:10" },
            { sender: "John Smith", message: "Thank you for your guidance.", time: "09:12" },
          ],
        },
    ];


    const [filters, setFilters] = useState({
        doctorName: "",
        dateFrom: "",
        dateTo: "",
        status: "all",
    });
    const [tempFilters, setTempFilters] = useState(filters);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const sortData = (data, sortConfig) => {
        if (!sortConfig.key) return data;
        return [...data].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        });
    };

    const filterData = (data) => {
        return data.filter((item) => {
            const doctorMatch = item.doctorName
                .toLowerCase()
                .includes(filters.doctorName.toLowerCase());
            const statusMatch =
                filters.status === "all" || item.status === filters.status;
            const dateMatch =
                (!filters.dateFrom || item.date >= filters.dateFrom) &&
                (!filters.dateTo || item.date <= filters.dateTo);
            return doctorMatch && statusMatch && dateMatch;
        });
    };

    const requestSort = (key) => {
        const direction =
            sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
        setSortConfig({ key, direction });
    };

    const applyFilters = () => {
        setFilters(tempFilters);
        setIsFilterOpen(false);
    };

    const resetFilters = () => {
        const resetState = {
            doctorName: "",
            dateFrom: "",
            dateTo: "",
            status: "all",
        };
        setTempFilters(resetState);
        setFilters(resetState);
        setIsFilterOpen(false);
    };

    const getActiveFiltersCount = () => {
        return Object.values(filters).filter(value => value && value !== "all").length;
    };

    const filteredAndSortedData = sortData(filterData(historicalData), sortConfig);

    if (!filteredAndSortedData.length) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <EmptyState onReset={resetFilters} />
            </div>
        );
    }

    const FilterFields = ({ isModal = false, values, onChange }) => (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Doctor Name</label>
                <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <Input
                        placeholder="Filter by doctor"
                        value={values.doctorName}
                        onChange={(e) =>
                            onChange({ ...values, doctorName: e.target.value })
                        }
                        className="flex-1"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <Input
                            type="date"
                            value={values.dateFrom}
                            onChange={(e) =>
                                onChange({ ...values, dateFrom: e.target.value })
                            }
                            className="flex-1"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <Input
                            type="date"
                            value={values.dateTo}
                            onChange={(e) =>
                                onChange({ ...values, dateTo: e.target.value })
                            }
                            className="flex-1"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                    value={values.status}
                    onValueChange={(value) => onChange({ ...values, status: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    return (
        <div className="p-4 md:p-6">
            {/* Desktop Filters */}
            <Card className="mb-6 hidden md:block">
                <CardContent className="pt-6">
                    <FilterFields values={filters} onChange={setFilters} />
                </CardContent>
            </Card>

            {/* Mobile Filter Button */}
            <div className="flex justify-between items-center mb-4 md:hidden">
                <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="relative">
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                            {getActiveFiltersCount() > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                                    {getActiveFiltersCount()}
                                </span>
                            )}
                        </Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Filters</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                            <FilterFields isModal values={tempFilters} onChange={setTempFilters} />
                        </div>
                        <SheetFooter className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t">
                            <div className="flex space-x-2 w-full">
                                <Button
                                    variant="outline"
                                    onClick={resetFilters}
                                    className="flex-1"
                                >
                                    Reset
                                </Button>
                                <Button
                                    onClick={applyFilters}
                                    className="flex-1"
                                >
                                    Apply Filters
                                </Button>
                            </div>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="rounded-lg border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead
                                onClick={() => requestSort("doctorName")}
                                className="cursor-pointer"
                            >
                                Doctor <ArrowUpDown className="inline w-4 h-4" />
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("date")}
                                className="cursor-pointer hidden md:table-cell"
                            >
                                Date <ArrowUpDown className="inline w-4 h-4" />
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("time")}
                                className="cursor-pointer hidden md:table-cell"
                            >
                                Time <ArrowUpDown className="inline w-4 h-4" />
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("type")}
                                className="cursor-pointer hidden md:table-cell"
                            >
                                Type <ArrowUpDown className="inline w-4 h-4" />
                            </TableHead>
                            <TableHead
                                onClick={() => requestSort("status")}
                                className="cursor-pointer"
                            >
                                Status <ArrowUpDown className="inline w-4 h-4" />
                            </TableHead>
                            <TableHead>Chat</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedData.map((appointment) => (
                            <TableRow key={appointment.id}>
                                <TableCell className="font-medium">
                                    <div>{appointment.doctorName}</div>
                                    <div className="text-sm text-gray-500 md:hidden">
                                        {appointment.date} {appointment.time}
                                    </div>
                                    <div className="text-sm text-gray-500 md:hidden">
                                        {appointment.type}
                                    </div>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{appointment.date}</TableCell>
                                <TableCell className="hidden md:table-cell">{appointment.time}</TableCell>
                                <TableCell className="hidden md:table-cell">{appointment.type}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-2 py-1 rounded-full text-xs ${appointment.status === "completed"
                                                ? "bg-green-100 text-green-800"
                                                : appointment.status === "cancelled"
                                                    ? "bg-red-100 text-red-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                            }`}
                                    >
                                        {appointment.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="text-xs text-gray-500 bg-orange-100 hover:bg-orange-500 hover:text-white"
                                                size="sm"
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                                <span>See Chat History</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md max-w-sm rounded-md">
                                            <DialogHeader>
                                                <DialogTitle>Chat History</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                                                {appointment.chatHistory.map((chat, index) => (
                                                    <div
                                                        key={index}
                                                        className={`p-3 rounded-lg ${chat.sender.startsWith("Dr.")
                                                                ? "bg-orange-100 mr-4"
                                                                : "bg-gray-100 ml-4"
                                                            }`}
                                                    >
                                                        <div className="font-semibold text-sm">
                                                            {chat.sender}
                                                        </div>
                                                        <div className="text-sm">{chat.message}</div>
                                                        <div className="text-xs text-gray-500">
                                                            {chat.time}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default UserHistory;





const EmptyState = ({ onReset }) => (
    <Card className="flex flex-col items-center justify-center p-8 m-4 space-y-4">
        <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gray-100 animate-pulse"></div>
            <FileX className="relative w-16 h-16 text-gray-400" />
        </div>

        <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">No Records Found</h3>
            <p className="text-sm text-gray-500 max-w-sm">
                We couldn't find any records matching your current filters. Try adjusting your search criteria.
            </p>
        </div>

        <div className="flex gap-3">
            <Button
                variant="outline"
                onClick={onReset}
                className="text-sm"
            >
                Reset Filters
            </Button>
            <Button
                variant="default"
                onClick={() => window.location.reload()}
                className="text-sm bg-orange-500 text-white hover:bg-orange-600"
            >
                Refresh Page
            </Button>
        </div>
    </Card>
);