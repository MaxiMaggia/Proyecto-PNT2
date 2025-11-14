import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function Login({ navigation }) {
  const { login, isLogged } = useAuth();
  const [email, setEmail] = useState('');
  const [pass, setPass]  = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const go = async () => {
    setErr('');
    try {
      setLoading(true);
      await login(email.trim(), pass);
      navigation.replace('Map');
    } catch (e) {
      setErr(e.message || 'No se pudo iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>PetCare</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <Input value={email} onChangeText={setEmail} placeholder="tu@email.com" autoCapitalize="none" keyboardType="email-address" />
        <Text style={styles.label}>Contraseña</Text>
        <Input value={pass} onChangeText={setPass} placeholder="******" secureTextEntry />
        {!!err && <Text style={{color:'#fca5a5', marginTop:6}}>{err}</Text>}
      </View>

      <Button title={loading ? 'Ingresando…' : 'Iniciar Sesión'} onPress={go} disabled={loading} />
    </View>
  );
}
