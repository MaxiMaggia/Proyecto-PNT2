// Estado global de autenticación . Futuro: persistencia con AsyncStorage o SecureStore.
import React, { createContext, useContext, useMemo, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useHydrateAuth from '../hooks/useHydrateAuth';
import { buildUrl, endpoints } from '../config/api'; 

const LOGIN_URL = buildUrl(endpoints.auth.login);

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);

  useHydrateAuth(setIsLogged, setToken);

  const login = async (email, password) => {
    try {
      const res = await axios.post(LOGIN_URL, {
        email,
        password,
      });

      const token = res.data.token; 

      await AsyncStorage.setItem("auth_token", token);
      setToken(token);
      setIsLogged(true);

    } catch (error) {
      const msg = error.response?.data?.message || "Error al iniciar sesión";
      throw new Error(msg);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("auth_token");
    setToken(null);
    setIsLogged(false);
  };

  const value = useMemo(() => ({
    isLogged,
    token,
    login,
    logout
  }), [isLogged, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
