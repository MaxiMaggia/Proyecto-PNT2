// services/places.js
// En el futuro: integra Google Places
import mock from '../data/vets';

export async function getNearby({ lat, lng, radiusKm = 5, minRating = 0, openNow = undefined }) {
  // Implementar filtro real cuando haya API
  let list = mock.slice();
  if (minRating) list = list.filter(v => v.rating >= minRating);
  if (openNow != null) list = list.filter(v => v.open === !!openNow);
  // radiusKm: podrías filtrar por distanceKm mock, hoy ya viene en el JSON
  return list;
}
