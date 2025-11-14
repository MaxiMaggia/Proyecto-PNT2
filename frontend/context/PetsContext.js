import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as api from '../services/pets';
import { useAuth } from './AuthContext';

const PetsContext = createContext();

export function PetsProvider({ children }) {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!token) { setPets([]); setHydrated(true); return; }
      try {
        const list = await api.listPets(token);
        if (active) setPets(list);
      } catch {
        if (active) setPets([]);
      } finally {
        if (active) setHydrated(true);
      }
    })();
    return () => { active = false; };
  }, [token]);

  const addPet = async (pet) => {
    const tempId = 'tmp-' + Date.now();
    setPets(prev => [{ ...pet, id: tempId }, ...prev]);
    try {
      const created = await api.createPet(token, pet);
      setPets(prev => prev.map(p => p.id === tempId ? created : p));
      return created;
    } catch (e) {
      setPets(prev => prev.filter(p => p.id !== tempId));
      throw e;
    }
  };

  const updatePet = async (id, patch) => {
    const snapshot = pets;
    setPets(curr => curr.map(p => p.id === id ? { ...p, ...patch } : p));
    try {
      const saved = await api.updatePet(token, id, patch);
      setPets(curr => curr.map(p => p.id === id ? saved : p));
      return saved;
    } catch (e) {
      setPets(snapshot);
      throw e;
    }
  };

  const deletePet = async (id) => {
    const snapshot = pets;
    setPets(curr => curr.filter(p => p.id !== id));
    try {
      await api.deletePet(token, id);
    } catch (e) {
      setPets(snapshot);
      throw e;
    }
  };

  const value = useMemo(() => ({ pets, hydrated, addPet, updatePet, deletePet }), [pets, hydrated]);
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

export const usePets = () => {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets debe usarse dentro de PetsProvider');
  return ctx;
};
