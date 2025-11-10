// Rutas para tipos y razas (taxonomía).
import express from 'express';
import TaxonomyController from '../controlador/taxonomy.js';

class TaxonomyRouter {
  // Instancia controlador.
  #ctrl = new TaxonomyController();

  // Devuelve Router con endpoints de taxonomía.
  config() {
    const r = express.Router();
    r.get('/types', this.#ctrl.getTypes);
    r.get('/breeds', this.#ctrl.getBreeds);
    return r;
  }
}

export default TaxonomyRouter;
