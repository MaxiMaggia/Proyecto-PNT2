// Estado vacío reutilizable (se usa en PetList y otras vistas sin datos iniciales).
import React from 'react';
import { View, Text } from 'react-native';

// Muestra icono y mensaje cuando una lista proveniente de contextos está vacía.
export default function EmptyState({ icon = '🐾', title }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 48, opacity: 0.8, color: '#ffffff' }}>{icon}</Text>
      <Text style={{ marginTop: 8, fontSize: 16, fontWeight: '700', color: '#ffffff' }}>
        {title}
      </Text>
    </View>
  );
}
