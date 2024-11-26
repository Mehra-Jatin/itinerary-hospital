import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "@/hooks/use-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const { getToken, logout } = useAuth();
    const [doctors, setDoctors] = useState([]);
    const [verifiedDoctors, setVerifiedDoctors] = useState([]);
    
    const [Patients, setPatients] = useState([]);
    
    
    const [loading, setLoading] = useState(true);

    // Fetch all doctors (unverified included)
    const fetchDoctors = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await api.get('/doctors', config);
            const doctorList = response.data.doctors || [];
            const unverifiedDoctors = doctorList.filter(doctor => !doctor.isValidated);
            setDoctors(unverifiedDoctors);
        } catch (error) {
            console.error('Error fetching doctors:', error);
            toast({
                title: "Error",
                description: "Could not fetch doctors",
                variant: "destructive",
            });
            logout();
        } finally {
            setLoading(false);
        }
    };

    // Fetch only verified doctors
    const fetchVerifiedDoctors = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await api.get('/doctors', config);
            console.log(response.data);
            
            const doctorList = response.data.doctors || [];
            const verified = doctorList.filter(doctor => doctor.isValidated);
            setVerifiedDoctors(verified);
        } catch (error) {
            console.error('Error fetching verified doctors:', error);
            toast({
                title: "Error",
                description: "Could not fetch verified doctors",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    // Handle doctor validation (verify/cancel)
    const handleValidation = async (doctorId, action) => {
        try {
            const token = await getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const endpoint = action === 'verify' 
                ? `/acceptvalidate/${doctorId}` 
                : `/canclevalidate/${doctorId}`;

            await api.put(endpoint, {}, config);

            // Update doctors list by filtering out the validated or removed doctor
            setDoctors(prevDoctors => prevDoctors.filter(doc => doc._id !== doctorId));
            setVerifiedDoctors(prevDoctors => prevDoctors.filter(doc => doc._id !== doctorId));
            
            toast({
                title: "Success",
                description: action === 'verify' 
                    ? "Doctor validated successfully" 
                    : "Doctor removed successfully",
                className: "bg-orange-500 text-white",
            });
        } catch (error) {
            console.error('Error processing doctor action:', error);
            toast({
                title: "Error",
                description: "Could not process doctor action",
                variant: "destructive",
            });
        }
    };

    const fetchPatients = async () => {
        try {
            const token = await getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await api.get('/users', config);
            console.log(response.data);
            const patientList = response.data.patients || [];
            setPatients(patientList);
        } catch (error) {
            console.error('Error fetching patients:', error);
            toast({
                title: "Error",
                description: "Could not fetch patients",
                variant: "destructive",
            });
        }
    }

    return (
        <AdminContext.Provider value={{ doctors, verifiedDoctors, loading, fetchDoctors, fetchVerifiedDoctors, handleValidation, fetchPatients }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    return useContext(AdminContext);
};
