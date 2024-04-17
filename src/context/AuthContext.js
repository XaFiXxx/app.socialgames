import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: !!localStorage.getItem('token'), // Vérifie si un token est stocké et définit isAuthenticated en conséquence
        user: JSON.parse(localStorage.getItem('user')) || null, // Récupère l'utilisateur stocké dans localStorage, si disponible
        token: localStorage.getItem('token') || ''
    });

    // Effectue une mise à jour de l'état lors de la récupération initiale de la page pour synchroniser l'état avec le localStorage
    useEffect(() => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (token && user) {
            setAuth({
                isAuthenticated: true,
                user: JSON.parse(user),
                token: token
            });
        }
    }, []);

    const login = (user, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user)); // Stocke également les informations de l'utilisateur dans localStorage
        setAuth({
            isAuthenticated: true,
            user: user,
            token: token
        });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Supprime également les informations de l'utilisateur de localStorage
        setAuth({
            isAuthenticated: false,
            user: null,
            token: ''
        });
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
