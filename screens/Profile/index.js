import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
      <Text style={{ fontSize: 28, marginBottom: 20 }}>
        Perfil
      </Text>

      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Usuario: {user?.nombreCompleto}
      </Text>

      <Pressable
        style={{ padding: 12, backgroundColor: '#ddd', borderRadius: 8, marginBottom: 20 }}
        onPress={() => navigation.navigate('EditUser')}
      >
        <Text>Editar información</Text>
      </Pressable>

      <Pressable
        style={{ padding: 12, backgroundColor: 'red', borderRadius: 8 }}
        onPress={logout}
      >
        <Text style={{ color: 'white' }}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );
}
