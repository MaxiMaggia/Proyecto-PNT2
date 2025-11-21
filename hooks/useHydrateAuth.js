import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_TOKEN_KEY = 'auth_token';
const STORAGE_USERID_KEY = 'auth_user_id';

export default function useHydrateAuth(setIsLogged, setToken, setUserId) {
  useEffect(() => {
    const hydrate = async () => {
      try {
        const storedToken = await AsyncStorage.getItem(STORAGE_TOKEN_KEY);
        const storedUserId = await AsyncStorage.getItem(STORAGE_USERID_KEY);

        if (storedToken) {
          setToken(storedToken);
          setIsLogged(true);
        }

        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (e) {
        console.log('Error hidratando auth', e);
      }
    };

    hydrate();
  }, [setIsLogged, setToken, setUserId]);
}
