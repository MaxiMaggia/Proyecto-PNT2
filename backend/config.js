// Carga variables de entorno y expone config general del servidor.
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const MODO_PERSISTENCIA = process.env.MODO_PERSISTENCIA || 'MEM';
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

export default { PORT, MODO_PERSISTENCIA, CORS_ORIGIN };
