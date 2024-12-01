import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const { getToken, logout } = useAuth();
  const [BookedAppointments, setBookedAppointments] = useState([]);

  const handleApiError = (err) => {
    console.error('API Error:', err);
    if (err.response) {
      switch (err.response.status) {
        case 401:
          logout();
          return 'Your session has expired. Please login again.';
        case 403:
          return 'You do not have permission to perform this action.';
        case 404:
          return 'The requested resource was not found.';
        case 400:
          return err.response.data?.message || 'Invalid request. Please check your input.';
        default:
          return err.response.data?.message || 'An error occurred while processing your request.';
      }
    }
    return 'Network error. Please check your connection.';
  };

  const getRequestConfig = async () => {
    try {
      const token = await getToken();
      return {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
    } catch (error) {
      console.error('Error getting token:', error);
      logout();
      throw new Error('Authentication failed');
    }
  };

  const updatePatientProfile = useCallback(async (userId, formData) => {
    if (!userId || !formData) {
      throw new Error('User ID and form data are required');
    }

    setIsLoading(true);
    setError(null);

    try {
      const config = await getRequestConfig();
      const sanitizedData = {
        FirstName: formData.FirstName?.trim(),
        LastName: formData.LastName?.trim(),
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender,
        email: formData.email?.trim().toLowerCase(),
        PhoneNo: String(formData.PhoneNo || "").trim() || undefined,
        // Note: Password should be handled separately with proper validation
      };

      const response = await api.put(`/user/${userId}`, sanitizedData, config);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  }, [getToken, logout]);

  const deletePatientAccount = useCallback(async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      const config = await getRequestConfig();
      const response = await api.delete(`/user/${userId}`, config);
      setIsLoading(false);
      logout(); // Automatically logout after successful deletion
      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  }, [getToken, logout]);

  const BookAppointment = useCallback(async (formData) => {
    if (!formData) {
      throw new Error('form data are required');
    }
    if (!formData.doctorId) {
      throw new Error('Doctor ID is required');
    }

    if (!formData.userId) {
      throw new Error('User ID is required');
    }

    if (!formData.date) {
      throw new Error('Date is required');
    }

    if (!formData.time) {
      throw new Error('Time is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      const config = await getRequestConfig();
      const response = await api.post(`/user/bookappointment`, formData, config);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  }, [getToken, logout]);

  const fetchAppointment = useCallback(async (id) => {
    try {
      const config = await getRequestConfig();
      const response = await api.get(`/appointment/${id}`, config);
      setBookedAppointments(response.data.appointment);
      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [getToken, logout]);

  const fetchAppointmentHistory = useCallback(async (userId) => {
    if (!userId) {
      throw new Error('User ID is required');
    }

    setIsLoading(true);
    setError(null);

    try {
      const config = await getRequestConfig();
      const response = await api.get(`/history/${userId}`, config);

      if (response.data.success) {
        const transformedData = response.data.history.map(appointment => ({
          _id: appointment._id,
          patientName: appointment.userId?.name || 'Unknown Patient',
          doctorName: appointment.doctorId?.name || 'Unknown Doctor',
          specialty: appointment.doctorId?.specialty || 'General',
          date: new Date(appointment.date).toISOString(),
          time: appointment.time || 'Not specified',
          status: (appointment.status || 'pending').toLowerCase(),
          type: appointment.type || 'General Consultation',
          notes: appointment.notes || '',
          chatHistory: Array.isArray(appointment.chatHistory) ? appointment.chatHistory : []
        }));
        setAppointmentHistory(transformedData);
      }
      setIsLoading(false);
      return response.data;
    } catch (err) {
      const errorMessage = handleApiError(err);
      setError(errorMessage);
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  }, [getToken, logout]);

  const clearAppointmentHistory = useCallback(() => {
    setAppointmentHistory([]);
    setError(null);
  }, []);

  const value = {
    isLoading,
    error,
    appointmentHistory,
    updatePatientProfile,
    deletePatientAccount,
    fetchAppointmentHistory,
    clearAppointmentHistory,
    fetchAppointment,
    BookAppointment,
    BookedAppointments
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

export default PatientContext;