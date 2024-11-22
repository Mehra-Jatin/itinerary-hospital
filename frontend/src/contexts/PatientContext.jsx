import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '@/utils/api';

const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const value = {
    isLoading,
    error,
    updatePatientProfile,
    deletePatientAccount,
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