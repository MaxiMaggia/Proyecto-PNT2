// Capa de negocio para Mascotas. Valida y delega en el DAO.
import PetsMemDAO from '../modelo/DAOs/petsMem.js';

class PetsService {
  // Selección del DAO (hoy MEM). Futuro: factory por MODO_PERSISTENCIA.
  #dao = new PetsMemDAO();

  // Valida payload mínimo y devuelve lista completa.
  obtenerTodos = async () => this.#dao.obtenerTodos();

  // Devuelve mascota por id o lanza error si no existe.
  obtenerPorId = async (id) => {
    const pet = await this.#dao.obtenerPorId(id);
    if (!pet) throw new Error('Mascota no encontrada');
    return pet;
  };

  // Crea mascota (name, type, breed?, birthDate?).
  crear = async (pet) => {
    if (!pet?.name || !pet?.type) throw new Error('Faltan campos obligatorios');
    return this.#dao.crear(pet);
  };

  // Actualiza mascota (patch) por id.
  actualizar = async (id, patch) => {
    const ok = await this.#dao.actualizar(id, patch);
    if (!ok) throw new Error('Mascota no encontrada');
    return ok;
  };

  // Borra mascota por id.
  borrar = async (id) => {
    const ok = await this.#dao.borrar(id);
    if (!ok) throw new Error('Mascota no encontrada');
    return ok;
  };
}

export default PetsService;
