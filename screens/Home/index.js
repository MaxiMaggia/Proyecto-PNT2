import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mascotas App</Text>

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('PetList')}
      >
        <Text style={styles.btnText}>Mis Mascotas</Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styles.btnText}>Veterinarias Cercanas</Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.btnText}>Mi Perfil</Text>
      </Pressable>
    </View>
  );
}
