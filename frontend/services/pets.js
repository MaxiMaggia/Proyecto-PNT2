// CRUD de Mascotas contra la API backend consumido por `PetsContext`.
const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

// Trae lista completa de mascotas para hidratar el contexto global.
export async function listPets() {
  const r = await fetch(`${API}/api/pets`);
  if (!r.ok) throw new Error('No se pudo listar mascotas');
  return r.json();
}

// Envía una mascota nueva al backend sincronizando altas del formulario `AddPet`.
export async function createPet(payload) {
  const r = await fetch(`${API}/api/pets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error('No se pudo crear');
  return r.json();
}

// Actualiza una mascota existente propagando cambios desde `PetsContext.updatePet`.
export async function updatePet(id, patch) {
  const r = await fetch(`${API}/api/pets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!r.ok) throw new Error('No se pudo actualizar');
  return r.json();
}

// Elimina una mascota por id tras las acciones de `PetsContext.deletePet`.
export async function deletePet(id) {
  const r = await fetch(`${API}/api/pets/${id}`, { method: 'DELETE' });
  if (!r.ok) throw new Error('No se pudo borrar');
  return r.json();
}

