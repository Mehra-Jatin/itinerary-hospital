import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const ChatNowButton = ({  doctor }) => {
    const [showChatButton, setShowChatButton] = useState(false);

    const staticAppointment = {
        date: new Date(), // Today's date
        time: '14:30' // Specific time for demonstration
    };

    useEffect(() => {
        const checkAppointmentTime = () => {
            const now = new Date();
            const appointmentDate = new Date(staticAppointment.date);
            const [hours, minutes] = staticAppointment.time.split(':').map(Number);

            // Create a date object with the appointment time
            const appointmentDateTime = new Date(
                appointmentDate.getFullYear(), 
                appointmentDate.getMonth(), 
                appointmentDate.getDate(), 
                hours, 
                minutes
            );

            // Check if today is the appointment date and current time is within 15 minutes of appointment time
            const isToday = now.toDateString() === appointmentDateTime.toDateString();
            const timeInRange = Math.abs(now.getTime() - appointmentDateTime.getTime()) <= 15 * 60 * 1000; // 15 minutes

            setShowChatButton(isToday && timeInRange);
        };

        // Check immediately and then set up an interval to check periodically
        checkAppointmentTime();
        const intervalId = setInterval(checkAppointmentTime, 60000); // Check every minute

        return () => clearInterval(intervalId);
    }, [staticAppointment]);

    if (!showChatButton) return null;

    return (
        <Link to={`/chat/${doctor._id}`}>
            <Button 
                variant="outline" 
                className="ml-4 border-green-400 text-green-600 hover:bg-green-50 animate-pulse"
            >
                <MessageCircle className="mr-2 w-4 h-4" />
                Chat Now
            </Button>
        </Link>
    );
};

export default ChatNowButton;