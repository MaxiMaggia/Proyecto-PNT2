import Constants from 'expo-constants';

const API_URL =
  Constants.expoConfig?.extra?.apiUrl ||
  Constants.manifest?.extra?.apiUrl ||
  'http://192.168.0.3:3000'; 

export const buildUrl = (path) => {
  if (!path) return API_URL;
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
};

export const endpoints = {
  auth: {
    login: '/api/auth/login',
    register: '/api/usuarios',
  },

  usuarios: {
    base: '/api/usuarios',
    create: '/api/usuarios',
    getAll: '/api/usuarios',
    getById: (id) => `/api/usuarios/${id}`,
    update: (id) => `/api/usuarios/${id}`,
    delete: (id) => `/api/usuarios/${id}`,

    mascotasDeUsuario: (id) => `/api/usuarios/${id}/mascotas`,
  },

  mascotas: {
    base: '/api/mascotas',
    create: '/api/mascotas',
    getAll: '/api/mascotas',
    getById: (id) => `/api/mascotas/${id}`,
    update: (id) => `/api/mascotas/${id}`,
    delete: (id) => `/api/mascotas/${id}`,

    getByUsuario: (usuarioId) => `/api/mascotas/usuario/${usuarioId}`,
  },
  animals: {
    base: '/api/animals',
    getAll: '/api/animals',
  },
};
