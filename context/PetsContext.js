// Estado global de mascotas: alta/edición/borrado. 
import React, { createContext, useContext, useMemo, useState } from 'react';

const PetsContext = createContext();

export function PetsProvider({ children }) {
  const [pets, setPets] = useState([]);

  const addPet = (pet) =>
    setPets((prev) => [{ ...pet, id: pet.id ?? Date.now() }, ...prev]);

  const updatePet = (id, patch) =>
    setPets((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));

  const deletePet = (id) =>
    setPets((prev) => prev.filter((p) => p.id !== id));

  const value = useMemo(() => ({ pets, addPet, updatePet, deletePet }), [pets]);
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

export const usePets = () => {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets debe usarse dentro de PetsProvider');
  return ctx;
};
