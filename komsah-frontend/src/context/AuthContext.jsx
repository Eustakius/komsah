import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            try {
                const { data } = await api.get('/user');
                setUser(data.data);
            } catch (error) {
                console.error("Auth check failed", error);
                localStorage.removeItem('auth_token');
                setUser(null);
            }
        }
        setLoading(false);
    };

    const login = async (credentials) => {
        // CSRF protection for Sanctum
        // await api.get('/sanctum/csrf-cookie'); // Not strictly needed for Token based but good practice if mixed
        const { data } = await api.post('/login', credentials);
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const { data } = await api.post('/register', userData);
        localStorage.setItem('auth_token', data.token);
        setUser(data.user);
        return data;
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
