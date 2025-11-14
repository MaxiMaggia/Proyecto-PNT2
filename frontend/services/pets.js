// FRONTEND/services/pets.js
const API = process.env.EXPO_PUBLIC_API_URL || 'http://IP:3000';

function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function listPets(token) {
  const r = await fetch(`${API}/api/mascotas`, {
    headers: { ...authHeaders(token) }
  });
  if (!r.ok) throw new Error('No se pudo listar mascotas');
  return r.json();
}

export async function createPet(token, payload) {
  const r = await fetch(`${API}/api/mascotas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify(payload),
  });
  if (!r.ok) {
    const e = await r.json().catch(() => ({}));
    throw new Error(e.message || 'No se pudo crear');
  }
  return r.json();
}

export async function updatePet(token, id, patch) {
  const r = await fetch(`${API}/api/mascotas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders(token) },
    body: JSON.stringify(patch),
  });
  if (!r.ok) throw new Error('No se pudo actualizar');
  return r.json();
}

export async function deletePet(token, id) {
  const r = await fetch(`${API}/api/mascotas/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders(token) }
  });
  if (!r.ok) throw new Error('No se pudo borrar');
  return r.json();
}
