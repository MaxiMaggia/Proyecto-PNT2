import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function useLogoutAlert() {
  const { logout } = useAuth();

  const showLogoutAlert = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Querés cerrar tu sesión y volver al inicio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sí, cerrar sesión', style: 'destructive', onPress: logout },
      ],
    );
  };

  return showLogoutAlert;
}