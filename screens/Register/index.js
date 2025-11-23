import React, { useState, useMemo } from 'react';
import { View, Text, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import styles from './styles';

import { buildUrl, endpoints } from '../../config/api';
import { useAuth } from '../../context/AuthContext';

const REGISTER_URL = buildUrl(endpoints.auth.register);

export default function Register({ navigation }) {
  const { login } = useAuth(); 

  const [errors, setErrors] = useState({});

  const [nombreCompleto, setNombreCompleto] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const isFormValid = useMemo(() => {
    return nombreCompleto.trim() && email.trim() && password.trim();
  }, [nombreCompleto, email, password]);

  const handleRegister = async () => {
    setErrors({});

    const frontendErrors = {};

    if (!nombreCompleto.trim()) {
    frontendErrors.nombreCompleto = "El nombre es obligatorio";
    }

    if (!email.trim()) {
    frontendErrors.email = "El email es obligatorio";
    }

    if (!password.trim()) {
    frontendErrors.password = "La contraseña es obligatoria";
    }

    if (Object.keys(frontendErrors).length > 0) {
    setErrors(frontendErrors);
    return;
    }
  
    try {
      await axios.post(REGISTER_URL, {
        nombreCompleto,
        direccion,
        email,
        password,
      });
  
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: 'Revisá tu correo electrónico y activá tu cuenta antes de iniciar sesión.',
      });
      setTimeout(() => {
        navigation.replace("Login");
      }, 1200);
  
    } catch (err) {
            console.log('Error completo:', err);
            console.log('Datos del error:', err.response?.data);
        
            const backendErrors = err.response?.data;
        
            if (backendErrors) {
            setErrors(backendErrors);
            } else {
            setErrors({ general: err.message });
            }
        }
      };

  const clearError = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre Completo</Text>
        <Input
          placeholder="Nombre Completo"
          value={nombreCompleto}
          onChangeText={text => {
            setNombreCompleto(text);
            clearError('nombreCompleto');
          }}
        />
        {errors.nombreCompleto && <Text style={styles.error}>{errors.nombreCompleto}</Text>}

        <Text style={styles.label}>Dirección (opcional)</Text>
        <Input
          placeholder="Dirección"
          value={direccion}
          onChangeText={text => { setDireccion(text); }}
        />

        <Text style={styles.label}>Email</Text>
        <Input
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email@ejemplo.com"
          value={email}
          onChangeText={text => {
            setEmail(text.toLowerCase());
            clearError('email');
          }}
        />
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

        <Text style={styles.label}>Contraseña</Text>
        <Input
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={text => {
            setPassword(text);
            clearError('password');
          }}    
        />
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}
      </View>

      {errors.general && (
        <Text style={styles.error}>{errors.general}</Text>
        )}
      <Button
        title="Registrarme"
        onPress={handleRegister}
        style={[
          styles.primary,
          { backgroundColor: '#4caf50' },
          (!isFormValid) && { opacity: 0.5 }
        ]}
        textStyle={{ color: 'white' }}
        disabled={!isFormValid}
      />

      <Text style={{ color: '#4caf50', fontWeight: '700' }} onPress={() => navigation.goBack()}>
        Ya tengo cuenta → Iniciar Sesión
      </Text>
    </View>
  );
}
