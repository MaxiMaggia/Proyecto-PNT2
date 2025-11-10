// servicio/taxonomy.js
// Servicio de taxonomía: lee el JSON de tipos/razas y aplica filtro por prefijo.

import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Resuelve ruta absoluta a /data/taxonomy.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TAXONOMY_PATH = join(__dirname, '../data/taxonomy.json');

// Carga JSON desde disco (sin cachear mientras desarrollás)
async function loadData() {
  const raw = await readFile(TAXONOMY_PATH, 'utf-8');
  return JSON.parse(raw);
}

class TaxonomyService {
  // Devuelve array de tipos (Perro, Gato)
  getTypes = async () => {
    const data = await loadData();
    return data.types;
  };

  // Devuelve razas por tipo con filtro q (prefijo, case-insensitive)
  getBreeds = async ({ type, q = '' }) => {
    const data = await loadData();
    const key = String(type || '').toLowerCase();
    const all = data.breeds[key] || [];
    const norm = q.trim().toLowerCase();
    if (!norm) return all;
    return all.filter(b => b.toLowerCase().startsWith(norm));
  };
}

export default TaxonomyService;
