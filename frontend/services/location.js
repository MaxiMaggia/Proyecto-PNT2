// Servicio de ubicación que abastecerá al mapa y hojas de datos con coordenadas reales.
// En el futuro: usa expo-location
export async function getCurrentPosition() {
    // Ejemplo:
    // const { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') throw new Error('permiso denegado');
    // const { coords } = await Location.getCurrentPositionAsync({});
    // return coords;
    return { latitude: -34.6037, longitude: -58.3816 }; // mock mantenido para la maqueta del mapa.
  }
  