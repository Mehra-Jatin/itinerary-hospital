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
            // console.log(response.data);
            
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
            logout(); // Logout for token expiration need to be fixed
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
            logout(); // Logout for token expiration need to be fixed
        }
    };

    const fetchPatients = async () => {
        setLoading(true);
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
            const patientList = response.data.users?.filter(user => user.role === 'patient') || [];
            setPatients(patientList);
        } catch (error) {
            console.error('Error fetching patients:', error);
            toast({
                title: "Error",
                description: "Could not fetch patients",
                variant: "destructive",
            });
            logout(); // Logout for token expiration need to be fixed
        } finally {
            setLoading(false);
        }
    }

    // Delete patient account
    const deletePatientAccount = async (patientId) => {
        try {
            const token = await getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await api.delete(`/users/${patientId}`, config);
            return response.data;
        } catch (error) {
            console.error('Error deleting patient account:', error);
            toast({
                title: "Error",
                description: "Could not delete patient account",
                variant: "destructive",
            });
        }
    };

    return (
        <AdminContext.Provider value={{ 
            loading, 
            doctors, 
            verifiedDoctors, 
            fetchDoctors, 
            fetchVerifiedDoctors, 
            handleValidation, 
            fetchPatients, 
            Patients, 
            deletePatientAccount,

        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    return useContext(AdminContext);
};
