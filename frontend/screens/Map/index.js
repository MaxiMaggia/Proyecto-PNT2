// Pantalla de Mapa (maqueta):
// - Muestra imagen de mapa de fondo.
// - AppBar con botón izquierdo (va a Mis Mascotas) y derecho (abre filtros).
// - Bottom Sheet deslizable (lista de veterinarias mockeadas).
// - Panel de detalle rápido + acciones ("Indicaciones" interno o abrir Maps externo).
// - TODO futuro: reemplazar mocks por services/location + services/places.

import React, { useMemo, useRef, useState } from 'react';
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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image as ExpoImage } from 'expo-image';
import styles, { DRAG_MAX } from './styles';
import useFocusData from '../../hooks/useFocusData';
import vetsData from '../../data/vets';
import AppBar from '../../components/AppBar';

function Stars({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <Text style={styles.stars}>
      {'\u2605'.repeat(full)}
      {half ? '\u2606' : ''}
      {'\u2606'.repeat(empty)}
    </Text>
  );
}

export default function MapScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  // UI local
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedVet, setSelectedVet] = useState(null);
  const [routingTo, setRoutingTo] = useState(null);

  // Lista mockeada de vets
  const { data: list = [], loading } = useFocusData(async () => vetsData, []);

  // Altura efectiva del header (franja verde + safe-top)
  const headerHeight = useMemo(() => insets.top + 64 + 8, [insets.top]);

  // ===== Bottom Sheet
  const dragY = useRef(new Animated.Value(DRAG_MAX)).current; // inicia abajo (cerrado)
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

  // Abrir app de mapas nativa con coords
  const openExternalMaps = (vet) => {
    if (!vet?.coords) return;
    const { lat, lng } = vet.coords;
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${encodeURIComponent(vet.name)})`,
    });
    if (url) Linking.openURL(url).catch(() => {});
  };

// Marcar clínica como destino "en ruta"
  const startDirections = () => {
    if (!selectedVet) return;
    setRoutingTo(selectedVet);
    setSelectedVet(null);
  };

  return (
    <View style={styles.container}>
      {/* Mapa (placeholder) */}
      <ExpoImage
        source={require('../../assets/map-placeholder.jpg')}
        style={styles.mapBg}
        contentFit="cover"
        cachePolicy="memory-disk"
        transition={200}
      />

      <View style={[styles.appBarBg, { height: headerHeight }]} />
      <View style={[styles.appBarWrap, { paddingTop: insets.top + 8 }]}>
        <AppBar
          title="Find Vets"
          scheme="dark"
          onLeftPress={() => navigation.navigate('PetList')}
          onRightPress={() => setFiltersOpen(true)}
        />
      </View>
      {/* Chip "En ruta a …" */}
      {routingTo && (
        <View style={[styles.routeChip, { top: headerHeight + 8 }]}>
          <Text style={styles.routeChipTxt}>En ruta a: {routingTo.name}</Text>
          <Pressable style={styles.routeChipClose} onPress={() => setRoutingTo(null)}>
            <Text style={styles.routeChipCloseTxt}>{'\u2715'}</Text>
          </Pressable>
        </View>
      )}


      {!selectedVet && (
        <Animated.View style={[styles.sheet, { transform: [{ translateY: dragY }] }]}>
          {/* Manija: toca para abrir/cerrar */}
          <Pressable style={styles.sheetHandleWrap} onPress={toggleSheet}>
            <View style={styles.sheetHandle} />
          </Pressable>

          <Text style={styles.sheetTitle}>Vets Near You</Text>

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
                    <Text style={styles.badgeText}>{item.open ? 'Open' : 'Closed'}</Text>
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
              <Text style={styles.dirBackIcon}>{'\u2190'}</Text>
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
              {'\u201c'}Excelente atención, muy profesionales y amables con mi perrita. ¡Recomendados!{'\u201d'}
            </Text>
            <Text style={styles.reviewMeta}>{'\u2022'} Reseña destacada</Text>
          </View>

          <View style={[styles.dirActions, { justifyContent: 'flex-end' }]}>
            <Pressable style={styles.btn} onPress={startDirections}>
              <Text style={styles.btnTxt}>Indicaciones</Text>
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
