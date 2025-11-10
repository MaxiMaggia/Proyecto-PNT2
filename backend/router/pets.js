// Define las rutas REST de Mascotas y las vincula al controlador.
import express from 'express';
import PetsController from '../controlador/pets.js';

class PetsRouter {
  // Instancia controlador.
  #ctrl = new PetsController();

  // Devuelve un Router listo para montar.
  config() {
    const r = express.Router();
    r.get('/', this.#ctrl.obtener);
    r.get('/:id', this.#ctrl.obtener);
    r.post('/', this.#ctrl.crear);
    r.put('/:id', this.#ctrl.actualizar);
    r.delete('/:id', this.#ctrl.borrar);
    return r;
  }
}

export default PetsRouter;
