// DAO en memoria para Mascotas. Más adelante se puede reemplazar por Mongo/File.
import { v4 as uuid } from 'uuid';

class PetsMemDAO {
  // Array in-memory con datos iniciales vacíos.
  #pets = [];

  // Devuelve TODAS las mascotas.
  obtenerTodos = async () => this.#pets;

  // Devuelve una mascota por id o null.
  obtenerPorId = async (id) => this.#pets.find(p => p.id === id) || null;

  // Crea una mascota y la devuelve.
  crear = async (pet) => {
    const nuevo = { ...pet, id: pet.id || uuid() };
    this.#pets.unshift(nuevo);
    return nuevo;
  };

  // Actualiza por id con patch y devuelve la actualizada.
  actualizar = async (id, patch) => {
    const i = this.#pets.findIndex(p => p.id === id);
    if (i === -1) return null;
    const actualizado = { ...this.#pets[i], ...patch, id };
    this.#pets.splice(i, 1, actualizado);
    return actualizado;
  };

  // Borra por id y devuelve la eliminada.
  borrar = async (id) => {
    const i = this.#pets.findIndex(p => p.id === id);
    if (i === -1) return null;
    const [eliminada] = this.#pets.splice(i, 1);
    return eliminada;
  };
}

export default PetsMemDAO;
