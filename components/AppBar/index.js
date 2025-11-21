import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';

export default function AppBar({
  title = '',
  onLeftPress,
  onRightPress,
  scheme = 'dark', 
}) {
  const titleStyle = scheme === 'dark' ? styles.titleDark : styles.titleLight;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={onLeftPress}
        style={styles.circleBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Mis mascotas"
        accessibilityRole="button"
      >

        <Text style={styles.iconGreen}>🐾</Text>
      </Pressable>

      <Text style={[styles.titleBase, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      <Pressable
        onPress={onRightPress}
        style={styles.circleBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Cerrar sesión"
        accessibilityRole="button"
      >
        <Text style={styles.iconGreen}>⏻</Text>
      </Pressable>
    </View>
  );
}
