// Botón primario coherente con tu paleta, reutilizado por múltiples pantallas para acciones principales.
import React from 'react';
import { Pressable, Text } from 'react-native';

const GREEN = '#13ec13';
const DARK = '#102210';

// Renderiza un botón temático utilizado por formularios y barras de acción dentro de las pantallas.
export default function Button({ title, onPress, style, textStyle, ...rest }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: 48,
          borderRadius: 12,
          backgroundColor: GREEN,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 18,
        },
        style,
      ]}
      accessibilityRole="button"
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      {...rest}
    >
      <Text style={[{ color: DARK, fontWeight: '800' }, textStyle]}>{title}</Text>
    </Pressable>
  );
}
