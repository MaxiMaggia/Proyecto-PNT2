// Carga datos cada vez que la screen gana foco reutilizando lógica entre pantallas.
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

// Ejecuta loader cuando la screen se vuelve activa para sincronizar contextos y servicios.
export default function useFocusData(loader, deps = []) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  // Vincula el ciclo de vida del foco de navegación con la promesa de datos remotos.
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
