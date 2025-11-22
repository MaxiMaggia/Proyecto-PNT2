import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MapScreen from '../screens/Map';
import VetDetail from '../screens/VetDetail';
import PetList from '../screens/PetList';
import AddPet from '../screens/AddPet';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import EditProfile from '../screens/Profile/EditProfile';
import AppBar from '../components/AppBar';
import { useAuth } from '../context/AuthContext';
import useLogoutAlert from '../hooks/useLogoutAlert';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  const showLogoutAlert = useLogoutAlert();

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: ({ route }) => (
          <AppBar title={route.name} scheme="dark" />
        ),
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          header: () => <AppBar title="Inicio" showBackButton={false} />
        }}
      />
      <Stack.Screen 
        name="Map" 
        component={MapScreen} 
        options={{
          header: () => <AppBar title="Mapa" showBackButton={true} showLogoutButton={false} />
        }}
      />
      <Stack.Screen name="VetDetail" component={VetDetail} />
      <Stack.Screen name="PetList" component={PetList} options={{
        header: () => <AppBar title="Mis mascotas" showBackButton={true} showLogoutButton={false} />
      }} />
      <Stack.Screen name="AddPet" component={AddPet} options={{
        header: ({ route }) => {
          const isEdit = !!route.params?.pet;
          return <AppBar title={isEdit ? "Editar Mascota" : "Añadir Mascota"} showBackButton={true} showLogoutButton={false} />;
        }
      }} />
      <Stack.Screen name="Profile" component={Profile} options={{
        header: () => <AppBar title="Mi Perfil" showBackButton={true} showLogoutButton={false} />
      }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{
        header: () => <AppBar title="Editar Perfil" showBackButton={true} showLogoutButton={false} />
      }} />
    </Stack.Navigator>
  );
}
