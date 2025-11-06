// services/breeds.js
// En el futuro: consulta a API pública de razas (perros/gatos).
export async function getBreedsByType(type) {
    if (type.toLowerCase() === 'perro') return ['Golden Retriever', 'Caniche', 'Labrador'];
    if (type.toLowerCase() === 'gato') return ['Siamés', 'Persa', 'Maine Coon'];
    return ['Tipo 1', 'Tipo 2'];
  }
  