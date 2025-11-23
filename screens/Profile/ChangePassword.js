import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../services/users';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Toast from 'react-native-toast-message';
import styles from './changePasswordStyles';

export default function ChangePassword({ navigation }) {
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSavePassword = async () => {
    if (!currentPassword.trim() || !newPassword.trim() || !repeatPassword.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Completá todos los campos',
      });
      return;
    }

    if (newPassword.trim().length < 2) {
      Toast.show({
        type: 'error',
        text1: 'La contraseña debe tener al menos 6 caracteres',
      });
      return;
    }

    if (newPassword.trim() !== repeatPassword.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Las contraseñas no coinciden',
      });
      return;
    }

    try {
      setLoading(true);

      await updateUser(userId, {
        currentPassword: currentPassword.trim(),
        password: newPassword.trim(),
      });

      Toast.show({
        type: 'success',
        text1: 'Contraseña actualizada',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1200);

    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err?.response?.data?.message || 'No se pudo actualizar la contraseña',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Cambiar contraseña</Text>

        <View style={styles.content}>

          <View style={styles.field}>
            <Text style={styles.label}>Contraseña actual</Text>
            <Input
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholder="Ingresa tu contraseña actual"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Nueva contraseña</Text>
            <Input
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Nueva contraseña"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Repetir nueva contraseña</Text>
            <Input
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry
              placeholder="Repetí la contraseña"
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Button
              title={loading ? 'Guardando...' : 'Guardar contraseña'}
              onPress={handleSavePassword}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
