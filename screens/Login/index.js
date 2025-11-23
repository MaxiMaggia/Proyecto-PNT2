import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, Alert } from 'react-native';
import styles from './styles';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import NetInfo from '@react-native-community/netinfo';

export default function Login({ navigation }) {
  const { login } = useAuth();
 
  const [isConnected, setIsConnected] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const isFormValid = useMemo(() => {
    return email.trim() && password.trim();
  }, [email, password]);


  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []); 

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <Text style={styles.brand}>PetCare</Text>
        <Text style={styles.error}>No hay conexión a internet</Text>
      </View>
    );
  }

  const go = async () => {
    setErrorMsg('');
    try {
      await login(email, password);
    } catch (err) {
      const msg =
        err?.response?.data?.message || 'Email o contraseña incorrectos';
      setErrorMsg(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PetCare</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <Input
          placeholder="email@ejemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={text => {
            setEmail(text.toLowerCase());
            setErrorMsg('');
          }}
        />

        <Text style={styles.label}>Contraseña</Text>
        <Input
           placeholder="Contraseña"
           value={password}
           secureTextEntry
           autoCapitalize="none"
           autoCorrect={false}
           textContentType="password"
           onChangeText={setPassword}
        />
      </View>

      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      <Button
        title="Iniciar Sesión"
        onPress={go}
        style={[
          styles.primary,
          { backgroundColor: '#4caf50' },
          (!isFormValid) && { opacity: 0.5 }
        ]}
        disabled={!isConnected || !isFormValid}
        textStyle={{ color: 'white' }}
      />

      <Text style={{ color: '#4caf50', fontWeight: '700' }} onPress={() => navigation.push('Register')}>
        Crear una cuenta nueva
      </Text>
    </View>
  );
}
