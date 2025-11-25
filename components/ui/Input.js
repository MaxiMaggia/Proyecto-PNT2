import React from 'react';
import { TextInput } from 'react-native';

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
          fontSize: 16,
        },
        props.style,
      ]}
      placeholderTextColor="#64748b"
    />
  );
}
