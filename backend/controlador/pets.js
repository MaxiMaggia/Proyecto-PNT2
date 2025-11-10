// Controlador HTTP para Mascotas. Maneja req/res y errores.
import PetsService from '../servicio/pets.js';

class PetsController {
  // Instancia la capa de servicio.
  #svc = new PetsService();

  // GET /api/pets  y  GET /api/pets/:id
  obtener = async (req, res) => {
    try {
      const { id } = req.params || {};
      const data = id ? await this.#svc.obtenerPorId(id) : await this.#svc.obtenerTodos();
      res.json(data);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  // POST /api/pets
  crear = async (req, res) => {
    try {
      const creado = await this.#svc.crear(req.body || {});
      res.status(201).json(creado);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  // PUT /api/pets/:id
  actualizar = async (req, res) => {
    try {
      const { id } = req.params;
      const act = await this.#svc.actualizar(id, req.body || {});
      res.json(act);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  // DELETE /api/pets/:id
  borrar = async (req, res) => {
    try {
      const { id } = req.params;
      const del = await this.#svc.borrar(id);
      res.json(del);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
}

export default PetsController;
