import 'react-native-gesture-handler';
import 'react-native-screens';
import Toast from 'react-native-toast-message';
import React from 'react';

import { AuthProvider } from './context/AuthContext';
import { PetsProvider } from './context/PetsContext';

import RootNavigator from './navigation/RootNavigator';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#13ec13' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#ff3333' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600',
      }}
    />
  ),
};

export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <RootNavigator />
        <Toast position="bottom" bottomOffset={50} />
      </PetsProvider>
    </AuthProvider>
  );
}
