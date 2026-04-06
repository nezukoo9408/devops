import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(() => {
        try {
            const saved = localStorage.getItem('userInfo');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Error parsing userInfo from localStorage:', error);
            localStorage.removeItem('userInfo');
            return null;
        }
    });

    const login = async (email, password) => {
        const { data } = await axios.post('/api/users/login', { email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const register = async (name, email, password) => {
        const { data } = await axios.post('/api/users', { name, email, password });
        setUserInfo(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
    };

    const logout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
    };

    useEffect(() => {
        if (userInfo) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [userInfo]);

    return (
        <AuthContext.Provider value={{ userInfo, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
