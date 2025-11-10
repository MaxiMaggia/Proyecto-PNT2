// Servicio de cámara/imágenes utilizado por AddPet cuando se habilite la captura real.
// services/camera.js
// En el futuro: usa expo-image-picker
export async function pickImage() {
    // const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    // if (result.canceled) return null;
    // return result.assets[0].uri;
    return null; // mock para mantener compatibilidad con flujo actual.
  }
  