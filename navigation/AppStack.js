import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from '../screens/Map';
import VetDetail from '../screens/VetDetail';
import PetList from '../screens/PetList';
import AddPet from '../screens/AddPet';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Map" component={MapScreen} />
      <Stack.Screen name="VetDetail" component={VetDetail} />
      <Stack.Screen name="PetList" component={PetList} />
      <Stack.Screen name="AddPet" component={AddPet} />
    </Stack.Navigator>
  );
}
