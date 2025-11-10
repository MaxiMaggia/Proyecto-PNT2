// Consulta al backend la lista de razas por tipo + filtro 'q' utilizada por la pantalla AddPet.
const API = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

// Obtiene razas filtradas por tipo y búsqueda parcial.
export async function getBreedsByType(type, q = '') {
  // Construye querystring compatible con el backend compartido por `PetsContext`.
  const params = new URLSearchParams({ type, q });
  const res = await fetch(`${API}/api/taxonomy/breeds?` + params.toString());
  if (!res.ok) throw new Error('Error consultando razas');
  return await res.json();
}
  