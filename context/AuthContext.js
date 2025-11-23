import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildUrl, endpoints } from '../config/api';
import useHydrateAuth from '../hooks/useHydrateAuth';
import { jwtDecode } from 'jwt-decode';

const LOGIN_URL = buildUrl(endpoints.auth.login);

const STORAGE_TOKEN_KEY = 'auth_token';
const STORAGE_USERID_KEY = 'auth_user_id';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useHydrateAuth(setIsLogged, setToken, setUserId);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(LOGIN_URL, { email, password });
      const token = res.data?.token;

      if (!token) throw new Error("Token faltante");
      const payload = jwtDecode(token);
      const userId = payload.userId;

      setToken(token);
      setUserId(userId);
      setIsLogged(true);

      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, token);
      await AsyncStorage.setItem(STORAGE_USERID_KEY, String(userId));
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove([STORAGE_TOKEN_KEY, STORAGE_USERID_KEY]);
    } catch (e) {
      console.log('Error limpiando storage auth', e);
    }
    setToken(null);
    setUserId(null);
    setIsLogged(false);
  };

  const value = useMemo(
    () => ({ isLogged, token, userId, login, logout }),
    [isLogged, token, userId]
  );

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          logout();        
        }
        return Promise.reject(error);
      }
    );
  
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return ctx;
}
