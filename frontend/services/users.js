
import { apiFetch } from './api';


export async function listUsers() {
  return apiFetch('/api/usuarios');
}


export async function findUserIdByEmail(email) {
  const users = await listUsers();
  const u = users.find(x => String(x.email).toLowerCase() === String(email).toLowerCase());
  return u?._id || u?.id || null;
}
