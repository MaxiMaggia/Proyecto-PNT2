// Consulta al backend la lista de razas por tipo + filtro 'q'.
const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

// Obtiene razas filtradas por tipo y búsqueda parcial.
export async function getBreedsByType(type, q = '') {
  const params = new URLSearchParams({ type, q });
  const res = await fetch(`${API}/api/taxonomy/breeds?` + params.toString());
  if (!res.ok) throw new Error('Error consultando razas');
  return await res.json();
}
  