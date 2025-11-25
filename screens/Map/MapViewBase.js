import React from 'react';
import { StyleSheet, View } from 'react-native';
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

      {/* posicion actual harrcodeada */}
      {userLocation && (
        <Marker
          coordinate={{
            latitude: userLocation.lat,
            longitude: userLocation.lng,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
          pinColor="blue"
          title="Mi posición"
        >
           <View style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#4285F4',
                borderWidth: 3,
                borderColor: 'white',
                shadowColor: '#000',
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5
              }} />
        </Marker>
      )}

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
