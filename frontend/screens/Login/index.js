// Pantalla de login que inicializa el flujo de navegación seguro.
import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

// Gestiona el ingreso y delega la autenticación al contexto global.
export default function Login({ navigation }) {
  const { login } = useAuth();
  // Marca sesión activa y redirige al mapa principal.
  const go = () => { login(); navigation.replace('Map'); };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PetCare</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email o Usuario</Text>
        <Input placeholder="tu@email.com" />

        <Text style={styles.label}>Contraseña</Text>
        <Input placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022'} secureTextEntry />
      </View>

      <Button title="Iniciar Sesión" onPress={go} style={styles.primary} textStyle={styles.primaryText} />

      <Text style={styles.link} onPress={go}>Crea una cuenta nueva</Text>
    </View>
  );
}

