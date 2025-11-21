import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { buildUrl, endpoints } from '../config/api';
import useHydrateAuth from '../hooks/useHydrateAuth';

const LOGIN_URL = buildUrl(endpoints.auth.login);

const STORAGE_TOKEN_KEY = 'auth_token';
const STORAGE_USERID_KEY = 'auth_user_id';

const AuthContext = createContext(null);

function extractUserIdFromPayload(payload) {
  if (!payload || typeof payload !== 'object') return null;

  if (payload.userId) return payload.userId;
  if (payload.id) return payload.id;
  if (payload._id) return payload._id;
  if (payload.usuarioId) return payload.usuarioId;

  const candidateObj = payload.usuario || payload.user;
  if (candidateObj) {
    if (typeof candidateObj === 'string') return candidateObj;
    if (candidateObj._id) return candidateObj._id;
    if (candidateObj.id) return candidateObj.id;
  }
  return null;
}

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

      if (!newToken) throw new Error('No se recibió el token del servidor');

      let uid = null;
      const resUser = res.data?.usuario || res.data?.user;
      if (resUser) uid = resUser._id || resUser.id || null;

      if (!uid) {
        try {
          const payload = jwtDecode(newToken);
          uid = extractUserIdFromPayload(payload);
        } catch (e) {
          console.log('Error decodificando token JWT', e);
        }
        console.log('✅ TOKEN GUARDADO:', newToken);
console.log('✅ USER ID DETECTADO:', uid);

      }

      setToken(newToken);
      setIsLogged(true);
      await AsyncStorage.setItem(STORAGE_TOKEN_KEY, newToken);

      if (uid) {
        setUserId(uid);
        await AsyncStorage.setItem(STORAGE_USERID_KEY, String(uid));
      } else {
        console.log('login: no se pudo obtener userId ni de la respuesta ni del token');
      }
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
