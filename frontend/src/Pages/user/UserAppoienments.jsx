import { useState, useEffect } from 'react';
import { FiMessageSquare, FiTrash2, FiX, FiCalendar, FiClock, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Sample appointment data
const sampleAppointments = [
    { id: 1, name: 'Dr. John Doe', date: '2023-07-15', time: '10:00 AM', status: 'pending' },
    { id: 2, name: 'Dr. Jane Smith', date: '2023-07-16', time: '11:00 AM', status: 'completed' },
    { id: 3, name: 'Dr. Michael Johnson', date: '2023-07-17', time: '12:00 PM', status: 'cancelled' },
    { id: 4, name: 'Dr. Emily Brown', date: '2023-07-18', time: '2:00 PM', status: 'pending' },
    { id: 5, name: 'Dr. David Lee', date: '2023-07-19', time: '3:00 PM', status: 'pending' },
    { id: 6, name: 'Dr. Sarah Wilson', date: '2023-07-20', time: '4:00 PM', status: 'pending' },
    { id: 7, name: 'Dr. Robert Taylor', date: '2023-07-21', time: '5:00 PM', status: 'pending' },
    { id: 8, name: 'Dr. Lisa Anderson', date: '2023-07-22', time: '6:00 PM', status: 'pending' },
];

export default function UserAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatOpen, setChatOpen] = useState(null);
    const [chatMessage, setChatMessage] = useState('');
    const [chatHistory, setChatHistory] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [direction, setDirection] = useState(0);

    const appointmentsPerPage = 3;
    const totalPages = appointments.length > 0 ? Math.ceil(appointments.length / appointmentsPerPage) : 0;

    useEffect(() => {
        // Simulating an API call
        const fetchAppointments = async () => {
            setLoading(true);
            setTimeout(() => {
                setAppointments(sampleAppointments);
                setLoading(false);
            }, 1000);
        };

        fetchAppointments();
    }, []);

    const handleCancelAppointment = (id) => {
        setAppointments(prevAppointments => prevAppointments.map(app =>
            app.id === id ? { ...app, status: 'cancelled' } : app
        ));
    };

    const handleDeleteAppointment = (id) => {
        setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== id));
    };

    const toggleChat = (id) => {
        setChatOpen(chatOpen === id ? null : id);
        setChatMessage('');
    };

    const sendChatMessage = (id) => {
        if (chatMessage.trim()) {
            setChatHistory(prev => ({
                ...prev,
                [id]: [...(prev[id] || []), chatMessage]
            }));
            setChatMessage('');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-orange-100 text-orange-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const changePage = (newPage) => {
        setDirection(newPage > currentPage ? 1 : -1);
        setCurrentPage(newPage);
    };

    if (loading) {
        return <div className='flex items-center justify-center text-3xl font-bold animate-pulse text-orange-600 h-[20vh]'>Loading appointments...</div>;
    }

    if (appointments.length === 0) {
        return (
            <div className="">
                <div className="relative text-white overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-orange-500 opacity-50 mix-blend-multiply"></div>
                    </div>
                    <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                        <div className="text-center animate-fade-in-down">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                You don't Have Any <span className="text-orange-900">Appointments</span>
                            </h1>
                            <p className="mt-6 max-w-3xl mx-auto text-xl text-orange-100 animate-fade-in-up">
                                Book an appointment in the <span className='italic font-semibold'>doctors section</span>
                            </p>
                        </div>
                        <div className="mt-10 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-orange-700 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                                Book An Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const paginatedAppointments = appointments.slice(
        (currentPage - 1) * appointmentsPerPage,
        currentPage * appointmentsPerPage
    );

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-orange-800 mb-6">Your Appointments</h1>
            <div className="space-y-6 mb-6">
                {paginatedAppointments.map((appointment, index) => (
                    <div
                        key={appointment.id}
                        className={`bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 ${
                            index % 2 === 0 ? 'animate-fade-in-left' : 'animate-fade-in-right'
                        }`}
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-lg font-semibold text-orange-700">{appointment.name}</h3>
                                <div className="mt-2 space-y-1">
                                    <p className="text-sm text-orange-600 flex items-center">
                                        <FiCalendar className="mr-2" />
                                        {appointment.date}
                                    </p>
                                    <p className="text-sm text-orange-600 flex items-center">
                                        <FiClock className="mr-2" />
                                        {appointment.time}
                                    </p>
                                    <p className={`text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${getStatusColor(appointment.status)}`}>
                                        <FiUser className="mr-1" />
                                        {appointment.status}
                                    </p>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => toggleChat(appointment.id)}
                                    className="text-orange-600 hover:text-orange-800 transition-colors duration-200"
                                    aria-label="Chat"
                                >
                                    <FiMessageSquare size={20} />
                                </button>
                                {appointment.status === 'pending' ? (
                                    <button
                                        onClick={() => handleCancelAppointment(appointment.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                        aria-label="Cancel appointment"
                                    >
                                        <FiX size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleDeleteAppointment(appointment.id)}
                                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                                        aria-label="Delete appointment"
                                    >
                                        <FiTrash2 size={20} />
                                    </button>
                                )}
                            </div>
                        </div>
                        {chatOpen === appointment.id && (
                            <div className="mt-4 bg-orange-50 rounded-lg p-4">
                                <h4 className="font-semibold text-orange-800">Chat with {appointment.name}</h4>
                                <div className="mt-2 h-40 overflow-y-auto bg-white p-2 rounded">
                                    {(chatHistory[appointment.id] || []).map((msg, index) => (
                                        <p key={index} className="text-sm text-orange-700">{msg}</p>
                                    ))}
                                </div>
                                <div className="flex mt-2">
                                    <input
                                        type="text"
                                        className="flex-1 border border-orange-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        value={chatMessage}
                                        onChange={(e) => setChatMessage(e.target.value)}
                                        placeholder="Type your message..."
                                    />
                                    <button
                                        onClick={() => sendChatMessage(appointment.id)}
                                        className="px-4 bg-orange-500 text-white rounded-r-lg hover:bg-orange-600 transition-colors duration-200"
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-orange-100 p-4 rounded-lg">
                <div className="flex space-x-2">
                    <button
                        disabled={currentPage === 1}
                        onClick={() => changePage(currentPage - 1)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-orange-700 bg-white border border-orange-300 rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        <FiChevronLeft className="mr-1" /> Previous
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => changePage(currentPage + 1)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-orange-700 bg-white border border-orange-300 rounded-md hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        Next <FiChevronRight className="ml-1" />
                    </button>
                </div>
                <span className="text-orange-700">
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            <style jsx>{`
                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInDown {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in-left {
                    animation: fadeInLeft 0.8s ease-out forwards;
                }

                .animate-fade-in-right {
                    animation: fadeInRight 0.8s ease-out forwards;
                }

                .animate-fade-in-down {
                    animation: fadeInDown 0.8s ease-out forwards;
                }

                .animate-fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
            `}</style>
        </div>
    );
}