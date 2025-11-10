// Pantalla que lista mascotas almacenadas en el contexto y permite navegar a su edición.
import React from 'react';
import { View, Text, Pressable, FlatList, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { usePets } from '../../context/PetsContext';
import useFocusData from '../../hooks/useFocusData';
import EmptyState from '../../components/ui/EmptyState';

// Consume `PetsContext` para renderizar el catálogo y delega al formulario de `AddPet`.
export default function PetList({ navigation }) {
  const insets = useSafeAreaInsets();
  const { pets, loading } = usePets();
  // Rehidrata la lista cuando el contexto cambia para mantener la vista sincronizada.
  const { data: list = [] } = useFocusData(async () => pets, [pets.length]);

  // Retorna al mapa principal reemplazando el stack con la ruta raíz.
  const goBackToMap = () => navigation.reset({ index: 0, routes: [{ name: 'Map' }] });
  // Abre el formulario `AddPet` pasando la mascota seleccionada para edición.
  const goEdit = (pet) => navigation.navigate('AddPet', { pet });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={goBackToMap} style={styles.backBtn}><Text style={styles.backIcon}>{'\u2190'}</Text></Pressable>
        <Text style={styles.title}>Mis Mascotas</Text><View style={{ width: 44 }} />
      </View>

      {loading ? (
        <View style={styles.empty}><Text style={styles.emptyTitle}>Cargando…</Text></View>
      ) : list.length === 0 ? (
        <EmptyState title="No hay mascotas, agrega una" />
      ) : (
        <FlatList
          data={list}
          keyExtractor={(it) => String(it.id)}
          contentContainerStyle={{ paddingBottom: insets.bottom + 96 }}
          renderItem={({ item }) => (
            <Pressable style={styles.item} onPress={() => goEdit(item)}>
              <Image source={require('../../assets/avatar-placeholder.png')} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.petName}>{item.name}</Text>
                <Text style={styles.petSub}>{item.type}{' \u2022 '}{item.breed || '\u2014'}</Text>
              </View>
              <Text style={{ fontSize: 22, color: '#334155' }}>{'\u270E'}</Text>
            </Pressable>
          )}
        />
      )}

      <Pressable
        style={[styles.fab, { bottom: insets.bottom + 28, right: 20 }]}
        onPress={() => navigation.navigate('AddPet')}
        hitSlop={{ top: 8, left: 8, right: 8, bottom: 8 }} 
      >
        <Text style={styles.fabPlus}>+</Text>
      </Pressable>
    </SafeAreaView>
  );
}

