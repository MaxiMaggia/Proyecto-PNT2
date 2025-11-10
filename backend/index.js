// Punto de entrada: levanta el Server con la config cargada.
import Server from './server.js';
import config from './config.js';

const server = new Server(config.PORT);
server.start();
