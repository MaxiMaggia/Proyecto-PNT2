import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.apiUrl;

export const endpoints = {
    auth: {
      login: "/api/auth/login",
      register: "/api/usuarios",   
    },
  
    usuarios: {
      base: "/api/usuarios",
      create: "/api/usuarios",        
      getAll: "/api/usuarios",        
      getById: (id) => `/api/usuarios/${id}`,
      update: (id) => `/api/usuarios/${id}`,
      delete: (id) => `/api/usuarios/${id}`,
  
      agregarMascota: (id) => `/api/usuarios/${id}/mascotas`,
    },
  
    mascotas: {
      base: "/api/mascotas",
      create: "/api/mascotas",         
      getAll: "/api/mascotas",         
      getById: (id) => `/api/mascotas/${id}`,
      update: (id) => `/api/mascotas/${id}`,
      delete: (id) => `/api/mascotas/${id}`,
    },
  };

export const buildUrl = (path) => `${API_URL}${path}`;
