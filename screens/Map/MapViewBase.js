import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapViewBase({ vets = [], onSelectVet, userLocation }) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: userLocation.lat,
        longitude: userLocation.lng,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      }}
      showsUserLocation={true}
      showsMyLocationButton={false}
    >
      {vets.map(vet => (
        <Marker
          key={vet.id}
          coordinate={{
            latitude: vet.coords.lat,
            longitude: vet.coords.lng
          }}
          pinColor={vet.open ? 'green' : 'blue'}
          onPress={() => onSelectVet?.(vet)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 }
});
  