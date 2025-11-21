import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buildUrl, endpoints } from '../config/api';
import useHydrateAuth from '../hooks/useHydrateAuth';

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
      const newToken = res.data?.token;
      const usuario = res.data?.usuario;

      if (!newToken || !usuario?._id) {
        throw new Error('Respuesta inválida del servidor');
      }

      setToken(newToken);
      setUserId(usuario._id);
      setIsLogged(true);

      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, newToken);
      await AsyncStorage.setItem(STORAGE_USERID_KEY, String(usuario._id));
    } catch (err) {
      console.error('Error en login', err?.response?.data || err.message);
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return ctx;
}
