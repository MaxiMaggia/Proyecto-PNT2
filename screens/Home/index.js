import React from 'react';
import { View, Text, Pressable, ImageBackground, Image } from 'react-native';
import styles from './styles';


export default function Home({ navigation }) {
  return (
    <ImageBackground 
  source={require('../../assets/pets.jpg')}
  style={styles.container}
  imageStyle={{ opacity: 0.08 }}
>
      {/* <Image
        source={require('../../assets/paw.png')}
        style={styles.logo}
      /> */}

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('PetList')}
      >
        <Text style={styles.btnText}>Mis Mascotas</Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Map')}
      >
        <Text style={styles.btnText}>Veterinarias Cercanas</Text>
      </Pressable>

      <Pressable
        style={styles.btn}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.btnText}>Mi Perfil</Text>
      </Pressable>
    </ImageBackground>
  );
}
