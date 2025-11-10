// Habilita CORS para permitir que el frontend (Expo) consuma la API.
import cors from 'cors';
import config from '../config.js';

export default cors({
  origin: config.CORS_ORIGIN === '*' ? true : config.CORS_ORIGIN,
  credentials: false
});
