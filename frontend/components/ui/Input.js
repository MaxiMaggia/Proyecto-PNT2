// Input base para unificar paddings/colores en formularios como AddPet y Login.
import React from 'react';
import { TextInput } from 'react-native';

// Propaga props de TextInput aplicando estilo coherente con componentes de formularios.
export default function Input(props) {
  return (
    <TextInput
      {...props}
      style={[
        {
          height: 48,
          borderRadius: 12,
          paddingHorizontal: 12,
          backgroundColor: '#f6f8f6',
          color: '#0f172a',
        },
        props.style,
      ]}
      placeholderTextColor="#64748b"
    />
  );
}
