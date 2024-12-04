import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';
import api from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';

// Create the context
export const DoctorContext = createContext();

// Context provider component
export const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken, logout, user } = useAuth();
  const [doctorAvailability, setDoctorAvailability] = useState({});
  const [userRatings, setUserRatings] = useState({});

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

  const updateDoctorProfile = async (profileData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put(`/doctor/${doctor._id}`, profileData, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } });
      setDoctor(response.data.updatedDoctor);
      return response.data.updatedDoctor;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const rateDoctorProfile = async (doctorId, rating) => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const response = await api.post(`/doctor/rate/${doctorId}`, 
        { rating }, 
        { 
          headers: { 
            'Content-Type': 'application/json', 
            Authorization: `Bearer ${token}` 
          } 
        }
      );
      
      // Update the specific doctor's rating in the local state
      const updatedDoctors = doctors.map(doc => 
        doc._id === doctorId 
          ? { ...doc, ratings: [...(doc.ratings || []), { rating, userId: user._id }] } 
          : doc
      );
      setDoctors(updatedDoctors);

      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Rating failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // New method to get average rating for a doctor
  const getDoctorAverageRating = async (doctorId) => {
    try {
      const token = await getToken();
      const response = await api.get(`/doctor/avg/${doctorId}`, {
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        }
      });
      
      return response.data.avg;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to fetch average rating';
      console.error(errorMessage);
      return 0;
    }
  };



  // Fetch doctors on initial load
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, loading, error, fetchDoctors, updateDoctorProfile, rateDoctorProfile,
      getDoctorAverageRating, }}>
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