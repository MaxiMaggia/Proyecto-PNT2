

import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TextInput,
  Linking,
  Platform,
  Animated,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import styles, { DRAG_MAX } from './styles';
import useFocusData from '../../hooks/useFocusData';
import vetsData from '../../data/vets';
import MapViewBase from './MapViewBase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Stars({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <Text style={styles.stars}>
      {'★'.repeat(full)}
      {half ? '☆' : ''}
      {'☆'.repeat(empty)}
    </Text>
  );
}



export default function MapScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [routingTo, setRoutingTo] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLocationLoading(true);
        setLocationError(null);

        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setLocationError('Permiso de ubicación denegado. Por favor, habilita el acceso a la ubicación en la configuración de la aplicación.');
          setLocationLoading(false);
          return;
        }

        // Get current location
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      } catch (error) {
        setLocationError('No se pudo obtener la ubicación. Verifica que el GPS esté activado.');
        console.error('Error getting location:', error);
      } finally {
        setLocationLoading(false);
      }
    })();
  }, []);
  const { data: list = [], loading } = useFocusData(async () => vetsData, []);

  const headerHeight = useMemo(() => insets.top + 64 + 8, [insets.top]);

  const dragY = useRef(new Animated.Value(DRAG_MAX)).current; 
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleSheet = () => {
    const nextOpen = !sheetOpen;
    setSheetOpen(nextOpen);
    Animated.spring(dragY, {
      toValue: nextOpen ? 0 : DRAG_MAX,
      useNativeDriver: true,
      speed: 20,
      bounciness: 0,
    }).start();
  };

  const openExternalMaps = (vet) => {
    if (!vet?.coords) return;
    const { lat, lng } = vet.coords;
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${encodeURIComponent(vet.name)})`,
    });
    if (url) Linking.openURL(url).catch(() => {});
  };

  // Marcar clínica como destino “en ruta”
  const startDirections = () => {
    if (!selectedVet) return;
    setRoutingTo(selectedVet);
    setSelectedVet(null);
  };

  // Show error alert if location failed
  useEffect(() => {
    if (locationError && !locationLoading) {
      Alert.alert(
        'Error de Ubicación',
        locationError,
        [{ text: 'OK' }]
      );
    }
  }, [locationError, locationLoading]);

  return (
    <View style={styles.container}>
      {/* Mapa */}
      {!locationLoading && userLocation ? (
        <MapViewBase vets={list} onSelectVet={setSelectedVet} userLocation={userLocation} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666' }}>Obteniendo ubicación...</Text>
        </View>
      )}

      {/* Chip “En ruta a …” */}
      {routingTo && (
        <View style={[styles.routeChip, { top: headerHeight + 8 }]}>
          <Text style={styles.routeChipTxt}>En ruta a: {routingTo.name}</Text>
          <Pressable style={styles.routeChipClose} onPress={() => setRoutingTo(null)}>
            <MaterialCommunityIcons name="close" size={20} color="white" />
          </Pressable>
        </View>
      )}


      {!selectedVet && (
        <Animated.View style={[styles.sheet, { transform: [{ translateY: dragY }] }]} >
          {/* Manija: toca para abrir/cerrar */}
          <Pressable style={styles.sheetHandleWrap} onPress={toggleSheet}>
          <MaterialCommunityIcons
              name={sheetOpen ? "chevron-down" : "chevron-up"}
              size={28}
              color="#888"
            />
          </Pressable>

          <Text style={styles.sheetTitle}>Veterinarias cerca</Text>

          {loading ? (
            <Text style={styles.loading}>Cargando…</Text>
          ) : (
            <FlatList
              data={list}
              keyExtractor={(it) => String(it.id)}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <Pressable style={styles.card} onPress={() => setSelectedVet(item)}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardSub}>{item.address}</Text>
                  </View>
                  <View
                    style={[
                      styles.badgeBase,
                      item.open ? styles.badgeOpen : styles.badgeClosed,
                    ]}
                  >
                    <Text style={styles.badgeText}>{item.open ? 'Abierto' : 'Cerrado'}</Text>
                  </View>
                  <Text style={styles.distance}>{item.distanceKm} km</Text>
                </Pressable>
              )}
            />
          )}
        </Animated.View>
      )}


      {!!selectedVet && (
        <View style={styles.infoPanel}>
          <View style={styles.dirHeader}>
            <Pressable onPress={() => setSelectedVet(null)} style={styles.dirBackBtn}>
              <MaterialCommunityIcons name="arrow-left" size={20} color="black" />
            </Pressable>
            <Text style={styles.dirTitle}>{selectedVet.name}</Text>
            <View style={{ width: 44 }} />
          </View>

          <Text style={styles.dirSub}>{selectedVet.address}</Text>

          <View style={styles.rateRow}>
            <Stars rating={selectedVet.rating ?? 4.5} />
            <Text style={styles.rateNum}>{(selectedVet.rating ?? 4.5).toFixed(1)}</Text>
            <Text style={styles.rateCount}>({selectedVet.reviews ?? 128} opiniones)</Text>
          </View>

          <View style={styles.reviewBox}>
            <Text style={styles.reviewText}>
              “Excelente atención, muy profesionales y amables con mi perrita. ¡Recomendados!”
            </Text>
            <Text style={styles.reviewMeta}>• Reseña destacada</Text>
          </View>

          <View style={[styles.dirActions, { justifyContent: 'flex-end' }]}>
            <Pressable style={[styles.btn, { backgroundColor: '#4caf50' }]} onPress={startDirections}>
              <Text style={[styles.btnTxt, { color: 'white' }]}>Indicaciones</Text>
            </Pressable>
            <View style={{ width: 10 }} />
            <Pressable style={styles.btnOutline} onPress={() => openExternalMaps(selectedVet)}>
              <Text style={styles.btnOutlineTxt}>Abrir en Maps</Text>
            </Pressable>
          </View>
        </View>
      )}


      <Modal
        visible={filtersOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setFiltersOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Filtros</Text>

            <Text style={styles.label}>Radio (km)</Text>
            <TextInput style={styles.input} keyboardType="numeric" placeholder="5" />

            <Text style={styles.label}>Puntuación mínima</Text>
            <TextInput style={styles.input} keyboardType="decimal-pad" placeholder="4.0" />

            <Text style={styles.label}>Estado</Text>
            <TextInput style={styles.input} placeholder="Abierto / Cerrado" />

            <View style={styles.modalRow}>
              <Pressable style={styles.btnGhost} onPress={() => setFiltersOpen(false)}>
                <Text style={styles.btnGhostTxt}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.btn} onPress={() => setFiltersOpen(false)}>
                <Text style={styles.btnTxt}>Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}