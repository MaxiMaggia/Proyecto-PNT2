// Carga datos cada vez que la screen gana foco
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function useFocusData(loader, deps = []) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        try {
          setLoading(true);
          const res = await loader();
          if (active) setData(res);
        } catch (e) {
          if (active) setError(e);
        } finally {
          if (active) setLoading(false);
        }
      })();
      return () => {
        active = false;
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps)
  );

  return { data, loading, error };
}
