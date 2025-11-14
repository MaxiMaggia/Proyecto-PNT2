import React, { createContext, useContext, useMemo, useState } from 'react';
import { loginRequest } from '../services/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const login = async (email, password) => {
    const { token } = await loginRequest(email, password);
    setToken(token);
    setUserEmail(email);
  };

  const logout = () => {
    setToken(null);
    setUserEmail(null);
  };

  const value = useMemo(() => ({
    isLogged: !!token,
    token,
    userEmail,
    login,
    logout
  }), [token, userEmail]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
