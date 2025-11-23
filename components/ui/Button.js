
import React from 'react';
import { Pressable, Text } from 'react-native';

const GREEN = '#13ec13';
const DARK = '#102210';

export default function Button({ title, onPress, style, textStyle, ...rest }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: 48,
          borderRadius: 12,
          backgroundColor: '#4caf50',
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
      <Text style={[{ color: '#102210', fontWeight: '800' }, textStyle]}>{title}</Text>
    </Pressable>
  );
}
