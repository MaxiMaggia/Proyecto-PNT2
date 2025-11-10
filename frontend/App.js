import 'react-native-gesture-handler';
import 'react-native-screens';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from './context/AuthContext';
import { PetsProvider } from './context/PetsContext';

import Login from './screens/Login';
import MapScreen from './screens/Map';
import VetDetail from './screens/VetDetail';
import PetList from './screens/PetList';
import AddPet from './screens/AddPet';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Map" component={MapScreen} />
            <Stack.Screen name="VetDetail" component={VetDetail} />
            <Stack.Screen name="PetList" component={PetList} />
            <Stack.Screen name="AddPet" component={AddPet} />
          </Stack.Navigator>
        </NavigationContainer>
      </PetsProvider>
    </AuthProvider>
  );
}
