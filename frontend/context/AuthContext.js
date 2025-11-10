// Estado global de autenticación . Futuro: persistencia con AsyncStorage o SecureStore.
import React, { createContext, useContext, useMemo, useState } from 'react';
import useHydrateAuth from '../hooks/useHydrateAuth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  useHydrateAuth(setIsLogged);

  const login = async () => {
    setIsLogged(true);
    // TODO persistencia real:
    // await AsyncStorage.setItem('auth_token', token);
  };

  const logout = async () => {
    setIsLogged(false);
    // TODO persistencia real:
    // await AsyncStorage.removeItem('auth_token');
  };

  const value = useMemo(() => ({ isLogged, login, logout }), [isLogged]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
