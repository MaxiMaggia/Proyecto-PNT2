import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './AuthContext';
import {
  fetchPetsByUsuarioId,
  createPet,
  updatePetApi,
  deletePetApi,
} from '../services/pets';

const PetsContext = createContext(null);

export function PetsProvider({ children }) {
  const { userId } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPets = useCallback(async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const data = await fetchPetsByUsuarioId(userId);

      const list = Array.isArray(data) ? data : data.mascotas || [];
      setPets(list);
    } catch (err) {
      console.error('Error al cargar mascotas', err?.response?.data || err.message);
      Alert.alert('Error', 'No se pudieron cargar tus mascotas.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const addPet = useCallback(
    async (formData) => {
      if (!userId) {
        console.log('❌ userId no definido en AuthContext');
        Alert.alert('Error', 'Tu sesión expiró. Iniciá sesión nuevamente.');
        return;
      }

      const payload = {
        nombre: formData.nombre?.trim() || 'Mi mascota',
        tipo: formData.tipo?.trim() || 'Perro',
        raza: formData.raza?.trim() || '',
        edad: formData.edad ?? null,
        cantidadVacunas: formData.cantidadVacunas ?? 0,
        usuarioId: userId,
        foto: formData.foto ?? null,
      };

      try {
        const nueva = await createPet(payload);
        setPets((prev) => [nueva, ...prev]);
        return nueva;
      } catch (err) {
        console.error('Error al crear mascota', err?.response?.data || err.message);
        const msg =
          err?.response?.data?.message ||
          err?.response?.data?.general ||
          'No se pudo crear la mascota.';
        Alert.alert('Error', msg);
        throw err;
      }
    },
    [userId]
  );

  const editPet = useCallback(async (id, formData) => {
    const payload = {
      nombre: formData.nombre?.trim() || 'Mi mascota',
      tipo: formData.tipo?.trim() || 'Perro',
      raza: formData.raza?.trim() || '',
      edad: formData.edad ?? null,
      cantidadVacunas: formData.cantidadVacunas ?? 0,
      foto: formData.foto ?? null,
    };

    try {
      const actualizada = await updatePetApi(id, payload);
      setPets((prev) => prev.map((p) => (p._id === actualizada._id ? actualizada : p)));
      return actualizada;
    } catch (err) {
      console.error('Error al actualizar mascota', err?.response?.data || err.message);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.general ||
        'No se pudo actualizar la mascota.';
      Alert.alert('Error', msg);
      throw err;
    }
  }, []);

  const removePet = useCallback(async (id) => {
    try {
      await deletePetApi(id);
      setPets((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Error al borrar mascota', err?.response?.data || err.message);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.general ||
        'No se pudo borrar la mascota.';
      Alert.alert('Error', msg);
      throw err;
    }
  }, []);

  const value = useMemo(
    () => ({
      pets,
      loading,
      loadPets,
      addPet,
      editPet,
      removePet,
    }),
    [pets, loading, loadPets, addPet, editPet, removePet]
  );

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

export function usePets() {
  const ctx = useContext(PetsContext);
  if (!ctx) throw new Error('usePets debe usarse dentro de un PetsProvider');
  return ctx;
}
