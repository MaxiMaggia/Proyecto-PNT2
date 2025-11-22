import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { getUserById } from '../../services/users';
import Button from '../../components/ui/Button';
import styles from './styles';

export default function Profile({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { userId } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserData = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const userData = await getUserById(userId);
      setUser(userData);
    } catch (err) {
      console.error('Error al cargar datos del usuario:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, [userId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Recargar datos cada vez que la pantalla toma foco (útil cuando se vuelve desde EditProfile)
      loadUserData();
    });

    return unsubscribe;
  }, [navigation]);

  const getMaskedPassword = () => {
    if (!user?.password) return '••••••••';
    return '••••••••';
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#13ec13" />
          <Text style={styles.loadingText}>Cargando perfil...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No se pudieron cargar los datos del usuario</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Nombre */}
          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{user.nombreCompleto || '—'}</Text>
            </View>
          </View>

          {/* Email */}
          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{user.email || '—'}</Text>
            </View>
          </View>

          {/* Contraseña oculta */}
          <View style={styles.field}>
            <Text style={styles.label}>Contraseña</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{getMaskedPassword()}</Text>
            </View>
          </View>
        </View>

        {/* Botón para editar perfil */}
        <View style={{ marginTop: 32 }}>
          <Button
            title="Editar Perfil"
            onPress={() => navigation.navigate('EditProfile', { user })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
