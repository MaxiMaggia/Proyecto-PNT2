import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';

import { AuthProvider } from './context/AuthContext';
import { PetsProvider } from './context/PetsContext';

import RootNavigator from './navigation/RootNavigator';

export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <RootNavigator />
      </PetsProvider>
    </AuthProvider>
  );
}
