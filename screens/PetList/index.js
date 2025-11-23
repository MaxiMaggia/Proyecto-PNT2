// screens/PetList/index.js
import React, { useCallback, useEffect } from 'react';
import { View, Text, FlatList, Pressable, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';
import { usePets } from '../../context/PetsContext';
import EmptyState from '../../components/ui/EmptyState';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PetList({ navigation }) {
  const insets = useSafeAreaInsets();
  const { pets, loading, loadPets } = usePets();

  // Cada vez que la pantalla toma foco, cargo las mascotas
  useFocusEffect(
    useCallback(() => {
      loadPets();
    }, [loadPets])
  );

  const goBack = () => navigation.goBack();
  const goEdit = (pet) => navigation.navigate('AddPet', { pet });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
    
      {loading ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Cargando mascotas…</Text>
        </View>
      ) : pets.length === 0 ? (
        <EmptyState icon="🐾" title="Todavía no cargaste mascotas" />
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item._id?.toString() ?? item.id?.toString()}
          contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
          renderItem={({ item }) => (
            <Pressable style={styles.item} onPress={() => goEdit(item)}>
              <Image
                source={
                  item.foto
                    ? { uri: item.foto }
                    : require('../../assets/avatar-placeholder.png')
                }
                style={styles.avatar}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.petName}>{item.nombre || item.name}</Text>
                <Text style={styles.petSub}>
                  {(item.tipo || item.type) ?? '—'} • {(item.raza || item.breed) ?? '—'}
                </Text>
              </View>
              <Feather name="edit" size={15} color="#334155" />
            </Pressable>
          )}
        />
      )}

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 28, right: 20 }, { backgroundColor: '#4caf50' }]}
        onPress={() => navigation.navigate('AddPet')}
        hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }}
      >
        <MaterialCommunityIcons name="plus" size={20} color="white" />
      </Pressable>
    </SafeAreaView>
  );
}
