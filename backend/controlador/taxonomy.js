// Controlador HTTP para Taxonomía: tipos y razas.
import TaxonomyService from '../servicio/taxonomy.js';

class TaxonomyController {
  // Instancia servicio.
  #svc = new TaxonomyService();

  // GET /api/taxonomy/types
  getTypes = async (_req, res) => {
    try {
      const types = await this.#svc.getTypes();
      res.json(types);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  };

  // GET /api/taxonomy/breeds?type=perro&q=p
  getBreeds = async (req, res) => {
    try {
      const { type, q } = req.query;
      const breeds = await this.#svc.getBreeds({ type, q });
      res.json(breeds);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
}

export default TaxonomyController;
