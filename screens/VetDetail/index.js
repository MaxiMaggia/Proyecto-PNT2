import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';

export default function VetDetail({ route, navigation }) {
  const { vet } = route.params;
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>←</Text>
        </Pressable>
        <Text style={styles.title}>Detalle de Veterinaria</Text>
        <View style={{ width: 44 }} />
      </View>

      <Text style={styles.name}>{vet.name}</Text>
      <Text style={styles.addr}>{vet.address}</Text>
      <Text style={styles.meta}>Distancia: {vet.distanceKm} km</Text>
      <Text style={styles.meta}>Estado: {vet.open ? 'Abierto' : 'Cerrado'}</Text>

      <View style={{ marginTop: 16 }}>
        <Pressable style={styles.btn} onPress={() => navigation.navigate('Directions', { vet })}>
          <Text style={styles.btnTxt}>Cómo llegar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
