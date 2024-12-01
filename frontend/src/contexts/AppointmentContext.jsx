import { createContext, useContext, useState, useEffect } from 'react';

const AppointmentContext = createContext();

// This will be connected to backend later
const sampleAppointments = [
  { id: 1, patientName: "John Smith", doctorName: "Dr. Sarah Wilson", date: new Date().toISOString().split('T')[0], time: "10:00", duration: 30, status: "ongoing", type: "General Checkup" },
  { id: 2, patientName: "Emily Brown", doctorName: "Dr. Michael Lee", date: new Date().toISOString().split('T')[0], time: "11:30", duration: 45, status: "pending", type: "Follow-up" },
  { id: 3, patientName: "James Wilson", doctorName: "Dr. Lisa Chen", date: new Date().toISOString().split('T')[0], time: "14:00", duration: 30, status: "completed", type: "Consultation" },
  { id: 4, patientName: "Sarah Johnson", doctorName: "Dr. Robert Taylor", date: new Date().toISOString().split('T')[0], time: "15:30", duration: 60, status: "cancelled", type: "Specialist Consultation" },
  { id: 5, patientName: "William Davis", doctorName: "Dr. Nancy Hall", date: new Date().toISOString().split('T')[0], time: "09:30", duration: 30, status: "pending", type: "Dental Checkup" },
  { id: 6, patientName: "Sophia Martinez", doctorName: "Dr. Richard Moore", date: new Date().toISOString().split('T')[0], time: "12:15", duration: 45, status: "ongoing", type: "General Checkup" },
  { id: 7, patientName: "Oliver Garcia", doctorName: "Dr. Angela Walker", date: new Date().toISOString().split('T')[0], time: "13:00", duration: 30, status: "completed", type: "Eye Exam" },
  { id: 8, patientName: "Isabella Anderson", doctorName: "Dr. Charles Wright", date: new Date().toISOString().split('T')[0], time: "14:45", duration: 30, status: "cancelled", type: "Follow-up" },
  { id: 9, patientName: "Liam Hernandez", doctorName: "Dr. Karen Adams", date: new Date().toISOString().split('T')[0], time: "10:30", duration: 60, status: "ongoing", type: "General Checkup" },
  { id: 10, patientName: "Mia Robinson", doctorName: "Dr. Thomas White", date: new Date().toISOString().split('T')[0], time: "11:00", duration: 30, status: "completed", type: "Consultation" },
  { id: 11, patientName: "Noah Martinez", doctorName: "Dr. Susan Young", date: new Date().toISOString().split('T')[0], time: "12:30", duration: 45, status: "pending", type: "Specialist Consultation" },
  { id: 12, patientName: "Ava Clark", doctorName: "Dr. Kevin King", date: new Date().toISOString().split('T')[0], time: "13:15", duration: 30, status: "ongoing", type: "Follow-up" },
  { id: 13, patientName: "Elijah Wright", doctorName: "Dr. Patricia Scott", date: new Date().toISOString().split('T')[0], time: "14:00", duration: 60, status: "completed", type: "General Checkup" },
  { id: 14, patientName: "Charlotte Perez", doctorName: "Dr. Brian Green", date: new Date().toISOString().split('T')[0], time: "15:00", duration: 30, status: "cancelled", type: "Dental Checkup" },
  { id: 15, patientName: "Lucas Hill", doctorName: "Dr. Elizabeth Harris", date: new Date().toISOString().split('T')[0], time: "16:00", duration: 30, status: "completed", type: "Eye Exam" },
  { id: 16, patientName: "Amelia Scott", doctorName: "Dr. Eric Carter", date: new Date().toISOString().split('T')[0], time: "10:45", duration: 30, status: "ongoing", type: "Consultation" },
  { id: 17, patientName: "Ethan Lewis", doctorName: "Dr. Megan Mitchell", date: new Date().toISOString().split('T')[0], time: "09:15", duration: 45, status: "pending", type: "Follow-up" },
  { id: 18, patientName: "Harper Allen", doctorName: "Dr. Samuel Turner", date: new Date().toISOString().split('T')[0], time: "11:45", duration: 60, status: "completed", type: "General Checkup" },
  { id: 19, patientName: "Jack Edwards", doctorName: "Dr. Diane Collins", date: new Date().toISOString().split('T')[0], time: "13:30", duration: 30, status: "cancelled", type: "Specialist Consultation" },
  { id: 20, patientName: "Ella Lopez", doctorName: "Dr. Anthony Barnes", date: new Date().toISOString().split('T')[0], time: "15:30", duration: 45, status: "ongoing", type: "Eye Exam" },
];

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // Simulate API call
        // TODO: Replace with actual API call when backend is ready
        setTimeout(() => {
          const today = new Date().toISOString().split('T')[0];
          const todaysAppointments = sampleAppointments.filter(
            app => app.date === today
          );
          
          // Update appointment status based on current time
          const updatedAppointments = todaysAppointments.map(app => {
            const now = new Date();
            const appTime = new Date(`${app.date}T${app.time}`);
            const endTime = new Date(appTime.getTime() + app.duration * 60000);
            
            if (app.status !== 'cancelled' && app.status !== 'completed') {
              if (now >= appTime && now < endTime) {
                return { ...app, status: 'ongoing' };
              } else if (now < appTime) {
                return { ...app, status: 'pending' };
              } else if (now >= endTime) {
                return { ...app, status: 'completed' };
              }
            }
            return app;
          });

          setAppointments(updatedAppointments);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError('Failed to fetch appointments');
        setLoading(false);
      }
    };

    fetchAppointments();
    
    // Update appointments status every minute
    const intervalId = setInterval(fetchAppointments, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const cancelAppointment = async (id) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      setAppointments(prev =>
        prev.map(app =>
          app.id === id ? { ...app, status: 'cancelled' } : app
        )
      );
    } catch (err) {
      setError('Failed to cancel appointment');
    }
  };

  const rescheduleAppointment = async (id, newDate, newTime) => {
    try {
      // TODO: Replace with actual API call when backend is ready
      setAppointments(prev =>
        prev.map(app =>
          app.id === id
            ? { ...app, date: newDate, time: newTime, status: 'pending' }
            : app
        )
      );
    } catch (err) {
      setError('Failed to reschedule appointment');
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        error,
        cancelAppointment,
        rescheduleAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider');
  }
  return context;
};