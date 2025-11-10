// Boot de sesión para sincronizar el contexto de autenticación con la persistencia prevista.
import { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Inicializa el estado de login en `AuthContext` leyendo (futuro) el almacenamiento seguro.
export default function useHydrateAuth(setIsLogged) {
  // Ejecuta la verificación una sola vez y cancela consecuencias cuando se desmonta.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        // const token = await AsyncStorage.getItem('auth_token');
        // if (active) setIsLogged(!!token);
        if (active) setIsLogged(false);
      } catch {
        if (active) setIsLogged(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [setIsLogged]);
}
