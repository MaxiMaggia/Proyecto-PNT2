// Hook sencillo para obtener un valor con debounce configurable usado por búsquedas y formularios.
import { useEffect, useState } from 'react';

// Expone un valor amortiguado que evita notificar a consumidores (ej. filtros) en cada cambio.
export function useDebouncedValue(value, delay = 700) {
  const [debounced, setDebounced] = useState(value);

  // Sincroniza temporizador para actualizar el valor tras el delay o cancelarlo en desmontaje/cambios.
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

