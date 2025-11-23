import React, { useState, useMemo } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { updateUser } from '../../services/users';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import styles from './styles';
import Toast from 'react-native-toast-message';
import { validateEmail } from '../../src/utils/validators';

export default function EditProfile({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const user = route?.params?.user; 

  const [nombreCompleto, setNombreCompleto] = useState(user?.nombreCompleto || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const hasChanges = useMemo(() => {
    return nombreCompleto.trim() !== user?.nombreCompleto?.trim() ||
    email.trim() !== user?.email?.trim();
  }, [nombreCompleto, email, user]);

  
  const handleSave = async () => {
    if (!nombreCompleto.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El nombre es obligatorio',
      });
      return;
    }

     if (email !== user.email && !validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'El email ingresado no es válido',
      });
      return;
    }
    
    try {
      setLoading(true);

      const updatePayload = {
        nombreCompleto: nombreCompleto.trim(),
      };

      if (email !== user.email) {
        updatePayload.email = email;
      }

      await updateUser(userId, updatePayload);

      Toast.show({
        type: 'success',
        text1: 'Tu perfil se actualizó correctamente',
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1200);
      
    } catch (err) {
      console.error('Error al actualizar perfil:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err?.response?.data?.message || err?.response?.data?.general || 'No se pudo actualizar el perfil',
      });
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

           {/* Email */}
           <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="Ingresa tu email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={{ marginTop: 8 }}
            />
          </View>

          <View style={{ marginTop: 8 }}>
            <Button
              title={loading ? 'Guardando...' : 'Guardar cambios'}
              onPress={handleSave}
              disabled={loading || !hasChanges}
              style={[
                { backgroundColor: '#4caf50' },
                (!hasChanges || loading) && { opacity: 0.5 }
              ]}
              textStyle={{ color: 'white' }}
            />
          </View>

          <Text
            style={{
              color: '#64748b',
              marginTop: 12,
              fontSize: 14,
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            Cambiar contraseña
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

