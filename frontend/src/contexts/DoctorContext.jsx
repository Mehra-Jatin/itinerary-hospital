// DoctorProvider.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/utils/api';

const DoctorContext = createContext();

export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getToken } = useAuth(); // Assuming this is a function that returns the token

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the token properly
      const token = typeof getToken === 'function' ? await getToken() : getToken;
      
      console.log('Fetching doctors with token:', token ? 'Token exists' : 'No token'); // Debug token

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      console.log('Making API request to:', `${api.defaults.baseURL}/doctors`); // Debug URL

      const response = await api.get('/doctors', config);
      console.log('Raw API response:', response); // Debug full response

      if (response.data.success) {
        console.log('Doctors data received:', response.data.doctors); // Debug doctors data
        setDoctors(response.data.doctors);
      } else {
        console.error('API returned success: false', response.data);
        setError('Failed to fetch doctors - API returned success: false');
      }
    } catch (error) {
      console.error('Full error object:', error); // Debug error
      console.error('Error response:', error.response); // Debug error response
      console.error('Error request:', error.request); // Debug error request
      
      setError(
        error.response?.data?.message || 
        error.message ||
        'An error occurred while fetching doctors'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = typeof getToken === 'function' ? getToken() : getToken;
    console.log('Token in useEffect:', token ? 'Token exists' : 'No token'); // Debug token in useEffect
    
    if (token) {
      fetchDoctors();
    } else {
      console.log('No token available, skipping fetch'); // Debug no token case
    }
  }, [getToken]);

  return (
    <DoctorContext.Provider 
      value={{
        doctors,
        loading,
        error,
        refetchDoctors: fetchDoctors
      }}
    >
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