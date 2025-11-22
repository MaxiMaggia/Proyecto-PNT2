import axios from 'axios';
import { buildUrl, endpoints } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig.extra.apiUrl;

export async function fetchPetsByUsuarioId(usuarioId) {
  const url = buildUrl(endpoints.mascotas.getByUsuario(usuarioId));
  const res = await axios.get(url);
  return res.data;

}

export async function createPet(payload) {
  if (!API_URL) {
    throw new Error("API_URL no está definida en expo-config");
  }

  const url = `${API_URL}/api/mascotas`;

  console.log("URL final createPet:", url);

  const token = await AsyncStorage.getItem("auth_token");

  const res = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return res.data;
}

export async function updatePetApi(id, payload) {
  const url = buildUrl(endpoints.mascotas.update(id));
  const res = await axios.put(url, payload);
  return res.data;
}

export async function deletePetApi(id) {
  const url = buildUrl(endpoints.mascotas.delete(id));
  const res = await axios.delete(url);
  return res.data;
}
