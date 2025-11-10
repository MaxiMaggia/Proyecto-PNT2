// Inicializa Express, middlewares y monta routers de la API.
import express from 'express';
import cors from './middleware/cors.js';
import PetsRouter from './router/pets.js';
import TaxonomyRouter from './router/taxonomy.js';

class Server {
  // Guarda puerto y routers.
  #port = null;
  #pets = new PetsRouter().config();
  #taxonomy = new TaxonomyRouter().config();

  // Recibe puerto por constructor.
  constructor(port) { this.#port = port; }

  // Arranca el servidor HTTP.
  start() {
    const app = express();
    app.use(cors);
    app.use(express.json());

    // Prefijo común de API
    app.use('/api/pets', this.#pets);
    app.use('/api/taxonomy', this.#taxonomy);

    const srv = app.listen(this.#port, () =>
      console.log(`API lista en http://localhost:${this.#port}`));
    srv.on('error', (e) => console.log('Error en server:', e.message));
  }
}

export default Server;
