import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import api from '@/utils/api';

// Create the context
export const DoctorContext = createContext();

// Context provider component
export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch all doctors
  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/doctors'); // fetching doctors
      setDoctors(response.data.doctors);
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError(err.response?.data?.message || 'Error fetching doctors');
    } finally {
      setLoading(false);
    }
  };

  // Fetch doctors on initial load
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, loading, error, fetchDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
};

export const useDoctor = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error('useDoctor must be used within a DoctorProvider');
  }
  return context;
};