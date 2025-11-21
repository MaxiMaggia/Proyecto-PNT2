// Boot de sesión. 
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useHydrateAuth(setIsLogged, setToken) {
  useEffect(() => {
    async function hydrate() {
      try {
        const storedToken = await AsyncStorage.getItem("auth_token");

        if (storedToken) {
          setToken(storedToken);
          setIsLogged(true);
        }

      } catch (err) {
        console.log("Error al hidratar sesión:", err);
      }
    }

    hydrate();
  }, []);
}
