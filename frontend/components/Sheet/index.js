// Componente de layout tipo bottom sheet reutilizable entre varias pantallas.
import React from 'react';
import { View, Text, ViewProps } from 'react-native';
import styles from './styles';

// Ofrece un contenedor con título que aloja contenido personalizado mediante composición.
export default function Sheet({
  title,
  headerRight = null,
  children,
  style
}) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.handleWrap}>
        <View style={styles.handle} />
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>
      <View style={styles.body}>
        {children}
      </View>
    </View>
  );
}
