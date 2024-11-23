import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '@/utils/api';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointmentHistory, setAppointmentHistory] = useState([]);

  const updatePatientProfile = useCallback(async (userId, formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.put(`/user/${userId}`, formData);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to update profile');
      setIsLoading(false);
      throw err;
    }
  }, []);

  const deletePatientAccount = useCallback(async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.delete(`/user/${userId}`);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to delete account');
      setIsLoading(false);
      throw err;
    }
  }, []);

  const fetchAppointmentHistory = useCallback(async (userId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/history/${userId}`);
      if (response.data.success) {
        // Transform the data to match our component's structure
        const transformedData = response.data.history.map(appointment => ({
          id: appointment._id,
          patientName: appointment.userId.name,
          doctorName: appointment.doctorId.name,
          date: new Date(appointment.date).toISOString().split('T')[0],
          time: appointment.time,
          status: appointment.status,
          type: appointment.type,
          chatHistory: appointment.chatHistory || []
        }));
        setAppointmentHistory(transformedData);
      }
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.message || 'Failed to fetch appointment history');
      setIsLoading(false);
      throw err;
    }
  }, []);

  // Function to clear history (useful when logging out)
  const clearAppointmentHistory = useCallback(() => {
    setAppointmentHistory([]);
  }, []);

  const value = {
    isLoading,
    error,
    appointmentHistory,
    updatePatientProfile,
    deletePatientAccount,
    fetchAppointmentHistory,
    clearAppointmentHistory
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

export const usePatient = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within a PatientProvider');
  }
  return context;
};