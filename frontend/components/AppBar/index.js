import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './styles';

export default function AppBar({
  title = '',
  onLeftPress,
  onRightPress,
  scheme = 'dark', // 'dark' texto blanco, 'light' texto oscuro
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

        <Text style={styles.iconGreen}>{'\uD83D\uDC3E'}</Text>
      </Pressable>

      <Text style={[styles.titleBase, titleStyle]} numberOfLines={1}>
        {title}
      </Text>

      <Pressable
        onPress={onRightPress}
        style={styles.circleBtn}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        accessibilityLabel="Parámetros de búsqueda"
        accessibilityRole="button"
      >

        <Text style={styles.iconGreen}>{'\u2699'}</Text>
      </Pressable>
    </View>
  );
}
