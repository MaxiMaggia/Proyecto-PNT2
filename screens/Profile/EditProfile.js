import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../services/users';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import styles from './styles';

export default function EditProfile({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const user = route?.params?.user; 

  const [nombreCompleto, setNombreCompleto] = useState(user?.nombreCompleto || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!nombreCompleto.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    try {
      setLoading(true);
      
      await updateUser(userId, {
        nombreCompleto: nombreCompleto.trim(),
      });

      Alert.alert(
        'Éxito',
        'Tu perfil se actualizó correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      Alert.alert(
        'Error',
        err?.response?.data?.message || err?.response?.data?.general || 'No se pudo actualizar el perfil'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>


        <View style={styles.content}>
          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <Input
              value={nombreCompleto}
              onChangeText={setNombreCompleto}
              placeholder="Ingresa tu nombre"
              style={{ marginTop: 8 }}
            />
          </View>

          <View style={{ marginTop: 24 }}>
            <Button
              title={loading ? 'Guardando...' : 'Guardar cambios'}
              onPress={handleSave}
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

