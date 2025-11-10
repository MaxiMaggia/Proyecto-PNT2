// Estado global de autenticación utilizado por navegacion y componentes protegidos.
import React, { createContext, useContext, useMemo, useState } from 'react';
import useHydrateAuth from '../hooks/useHydrateAuth';

const AuthContext = createContext();

// Expone estado y acciones de autenticación para envolver la app completa.
export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  useHydrateAuth(setIsLogged);

  // Marca al usuario como autenticado; pensado para integrarse con servicios reales.
  const login = async () => {
    setIsLogged(true);
    // TODO persistencia real:
    // await AsyncStorage.setItem('auth_token', token);
  };

  // Limpia el estado de autenticación y sincroniza futuros mecanismos de persistencia.
  const logout = async () => {
    setIsLogged(false);
    // TODO persistencia real:
    // await AsyncStorage.removeItem('auth_token');
  };

  // Memoriza el paquete de valores consumido por pantallas y componentes dependientes.
  const value = useMemo(() => ({ isLogged, login, logout }), [isLogged]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook de conveniencia para acceder al contexto en screens y componentes.
export const useAuth = () => useContext(AuthContext);
