import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

export default function RootNavigator() {
  const { isLogged } = useAuth();

  return (
    <NavigationContainer>
      {isLogged ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
