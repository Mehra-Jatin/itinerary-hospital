import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '@/utils/api';
import { useAuth } from '@/hooks/useAuth';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const { user, getToken } = useAuth();

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



    const value = {

    };

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

