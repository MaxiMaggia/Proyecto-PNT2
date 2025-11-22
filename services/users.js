import axios from 'axios';
import { buildUrl, endpoints } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl;

export async function getUserById(userId) {
  if (!API_URL) {
    throw new Error("API_URL no está definida en expo-config");
  }

  const url = `${API_URL}/api/usuarios/${userId}`;
  const token = await AsyncStorage.getItem("auth_token");

  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function updateUser(userId, payload) {
  if (!API_URL) {
    throw new Error("API_URL no está definida en expo-config");
  }

  const url = `${API_URL}/api/usuarios/${userId}`;
  const token = await AsyncStorage.getItem("auth_token");

  const res = await axios.put(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}

