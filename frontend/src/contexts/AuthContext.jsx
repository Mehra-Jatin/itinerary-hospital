import { createContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import api from "@/utils/api";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    useEffect(() => {
        checkUserLoggedn();
    }, []);

    const checkUserLoggedn = () => {
        const userFromCookie = Cookies.get('user');
        if (userFromCookie) {
            try {
                console.log(userFromCookie);
                
                const parsedUser = JSON.parse(userFromCookie);
                setUser(parsedUser);
            } catch (error) {
                console.error('Error parsing user data:', error);
                Cookies.remove('user');
            }
        }
        setLoading(false);
    }

    const login = async (email, password) => {
        try {
            const response = await api.post('/login', { email, password });
            if (response.status === 200 && response.data.success) {
               setUser(response.data.user);
               Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });
               return { 
                 success: true, 
                 message: response.data.message, 
                 user: response.data.user  // Explicitly return user
               };
            } else {
                return { 
                  success: false, 
                  message: response.data.message || 'Login failed.' 
                };
            }
        } catch (error) {
            console.error('Error logging in:', error);
            return { 
              success: false, 
              message: error.response?.data?.message || 'An error occurred. Login failed.' 
            };
        }
    }

    const register = async (userData) => {
        try {
            const registrationData = {
                ...userData,
                role: userData.role || 'patient'  // Add explicit role
            };
            const response = await api.post('/register', registrationData);
            if (response.data.success) {
                setUser(response.data.user);
                Cookies.set('user', JSON.stringify(response.data.user), { expires: 7 });
                return { 
                    success: true, 
                    user: response.data.user 
                };
            } else {
                return { 
                    success: false, 
                    message: response.data.message || 'Registration failed' 
                };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { 
                success: false, 
                message: error.response?.data?.message || 'An error occurred during registration' 
            };
        }
    };
    
      const logout = () => {
        setUser(null);
        Cookies.remove('user');
        // navigate('/auth/login');
      };


    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}