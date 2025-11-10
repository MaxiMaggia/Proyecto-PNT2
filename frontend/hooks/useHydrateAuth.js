// Boot de sesión. 
import { useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function useHydrateAuth(setIsLogged) {
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
