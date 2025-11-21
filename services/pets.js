import axios from 'axios';
import { buildUrl, endpoints } from '../config/api';


export async function fetchPetsByUsuarioId(usuarioId) {
  const url = buildUrl(endpoints.mascotas.getByUsuario(usuarioId));
  const res = await axios.get(url);
  return res.data;

}

export async function createPet(payload) {

  const url = buildUrl(endpoints.mascotas.create);
  const res = await axios.post(url, payload);
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
