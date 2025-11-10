// Estado global de mascotas con persistencia en la API (listar/crear/actualizar/borrar) consumido por varias pantallas.
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/pets';

const PetsContext = createContext();

// Agrupa estado y acciones relacionadas a mascotas y las expone al árbol de la app.
export function PetsProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // 1) Hidratar desde el backend al montar la app
  useEffect(() => {
    (async () => {
      try {
        const list = await api.listPets();
        setPets(list);
      } catch {
        // si el back no responde, quedamos vacíos (la UI sigue funcionando)
      } finally {
        setHydrated(true);
      }
    })();
  }, []);

  // 2) Alta con actualización optimista hacia `screens/PetList` y otras vistas que leen el listado.
  const addPet = async (pet) => {
    const tempId = 'tmp-' + Date.now();
    const optimistic = { ...pet, id: tempId };
    setPets(prev => [optimistic, ...prev]);
    try {
      const created = await api.createPet(pet);
      setPets(prev => prev.map(p => p.id === tempId ? created : p));
      return created;
    } catch (e) {
      setPets(prev => prev.filter(p => p.id !== tempId));
      throw e;
    }
  };

  // 3) Update con rollback si falla para mantener sincronía con `services/pets`.
  const updatePet = async (id, patch) => {
    const snapshot = pets;
    setPets(curr => curr.map(p => p.id === id ? { ...p, ...patch } : p));
    try {
      const saved = await api.updatePet(id, patch);
      setPets(curr => curr.map(p => p.id === id ? saved : p));
      return saved;
    } catch (e) {
      setPets(snapshot);
      throw e;
    }
  };

  // 4) Borrado con rollback si falla manteniendo coherencia con la API remota.
  const deletePet = async (id) => {
    const snapshot = pets;
    setPets(curr => curr.filter(p => p.id !== id));
    try {
      await api.deletePet(id);
    } catch (e) {
      setPets(snapshot);
      throw e;
    }
  };

  // Memoriza valores y acciones para evitar renders extra en componentes consumidores.
  const value = useMemo(() => ({ pets, hydrated, addPet, updatePet, deletePet }), [pets, hydrated]);
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

// Hook seguro que garantiza que el acceso suceda dentro del provider declarado en `App.js`.
export const usePets = () => {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets debe usarse dentro de PetsProvider');
  return ctx;
};
