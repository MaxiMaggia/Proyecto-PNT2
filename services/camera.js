import * as ImagePicker from 'expo-image-picker';
import { Alert, Platform } from 'react-native';

/**
 * Solicita permisos para acceder a la cámara
 */
async function requestCameraPermissions() {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Se necesitan permisos de cámara para tomar fotos.'
      );
      return false;
    }
  }
  return true;
}

/**
 * Solicita permisos para acceder a la galería
 */
async function requestMediaLibraryPermissions() {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Se necesitan permisos de galería para seleccionar imágenes.'
      );
      return false;
    }
  }
  return true;
}

/**
 * Toma una foto usando la cámara del dispositivo
 * @returns {Promise<string|null>} URI de la imagen o null si se cancela
 */
export async function takePhoto() {
  const hasPermission = await requestCameraPermissions();
  if (!hasPermission) {
    return null;
  }

  try {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets[0]?.uri || null;
  } catch (error) {
    console.error('Error al tomar foto:', error);
    Alert.alert('Error', 'No se pudo tomar la foto.');
    return null;
  }
}

/**
 * Selecciona una imagen de la galería del dispositivo
 * @returns {Promise<string|null>} URI de la imagen o null si se cancela
 */
export async function pickImage() {
  const hasPermission = await requestMediaLibraryPermissions();
  if (!hasPermission) {
    return null;
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    return result.assets[0]?.uri || null;
  } catch (error) {
    console.error('Error al seleccionar imagen:', error);
    Alert.alert('Error', 'No se pudo seleccionar la imagen.');
    return null;
  }
}

/**
 * Muestra un diálogo para elegir entre tomar foto o seleccionar de galería
 * @returns {Promise<string|null>} URI de la imagen o null si se cancela
 */
export async function pickImageOrTakePhoto() {
  return new Promise((resolve) => {
    Alert.alert(
      'Seleccionar foto',
      '¿Cómo deseas agregar la foto?',
      [
        {
          text: 'Tomar foto',
          onPress: async () => {
            const uri = await takePhoto();
            resolve(uri);
          },
        },
        {
          text: 'Elegir de galería',
          onPress: async () => {
            const uri = await pickImage();
            resolve(uri);
          },
        },
        {
          text: 'Cancelar',
          style: 'cancel',
          onPress: () => resolve(null),
        },
      ],
      { cancelable: true }
    );
  });
}
