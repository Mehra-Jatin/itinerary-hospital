import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';
import { toast } from "@/hooks/use-toast";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const { getToken, logout } = useAuth();
    const [loading, setLoading] = useState(true);
    const [doctors, setDoctors] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [verifiedDoctors, setVerifiedDoctors] = useState([]);

    const [Patients, setPatients] = useState([]);

    const [currentLogo, setCurrentLogo] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [Appointments, setAppointments] = useState([]);

    const [notifications, setNotifications] = useState([]);

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

    const fetchAllDoctors = async () => {
        setLoading(true);
        // setError(null);
        try {
            const response = await api.get('/doctors'); // fetching doctors
            setAllDoctors(response.data.doctors);
            //   console.log('wrgwgw',response.data.doctors);

            return response.data.doctors;
        } catch (err) {
            console.error('Error fetching doctors:', err);
            //   setError(err.response?.data?.message || 'Error fetching doctors');
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

    const uploadLogo = async (file) => {
        try {
            const formData = new FormData();
            formData.append('logo', file);

            const response = await api.post('/upload-logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percentCompleted);
                }
            });

            setCurrentLogo(response.data.logoUrl);
            setUploadProgress(0);
            return response.data.logoUrl;
        } catch (error) {
            console.error('Logo upload failed:', error);
            setUploadProgress(0);
            throw error;
        } ``
    };

    const fetchAllAppointments = async () => {
        try {
            const token = await getToken();
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };
            const response = await api.get('/getallAppointement', config);
            setAppointments(response.data.appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast({
                title: "Error",
                description: "Could not fetch appointments",
                variant: "destructive",
            });
            logout(); // Logout for token expiration need to be fixed
        }
    };

    const getNotifications = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/getnotification', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to fetch notifications');
            const data = await response.json();
            setNotifications(data.notifications);
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateNotification = useCallback(async (id, read) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/updatenotification/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ read }),
            });
            if (!response.ok) throw new Error('Failed to update notification');
            const data = await response.json();
            setNotifications(prevNotifications =>
                prevNotifications.map(notif =>
                    notif._id === id ? { ...notif, read: data.notification.read } : notif
                )
            );
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const deleteNotification = useCallback(async (id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/deletenotification/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Failed to delete notification');
            await response.json();
            setNotifications(prevNotifications =>
                prevNotifications.filter(notif => notif._id !== id)
            );
        } catch (error) {
            handleApiError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <AdminContext.Provider value={{
            loading,

            doctors,
            verifiedDoctors,

            allDoctors,
            fetchAllDoctors,

            fetchDoctors,
            fetchVerifiedDoctors,

            handleValidation,

            fetchPatients,
            Patients,
            deletePatientAccount,

            uploadLogo,
            currentLogo,
            setCurrentLogo,

            Appointments,
            fetchAllAppointments,

            notifications,
            getNotifications,
            updateNotification,
            deleteNotification,
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    return useContext(AdminContext);
};
