// screens/AddPet/index.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { usePets } from '../../context/PetsContext';

export default function AddPet({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { addPet, editPet, removePet } = usePets();

  const pet = route?.params?.pet;
  const isEdit = !!pet;

  const [name, setName] = useState(pet?.nombre || pet?.name || '');
  const [type, setType] = useState(pet?.tipo || pet?.type || 'Perro'); 
  const [breed, setBreed] = useState(pet?.raza || pet?.breed || '');
  const [age, setAge] = useState(
    pet?.edad !== undefined && pet?.edad !== null ? String(pet.edad) : ''
  );
  const [vaccines, setVaccines] = useState(
    pet?.cantidadVacunas !== undefined && pet?.cantidadVacunas !== null
      ? String(pet.cantidadVacunas)
      : ''
  );

  const goBack = () => navigation.goBack();

  const handleSave = async () => {
    const edadNum =
      age === '' || Number.isNaN(Number(age)) ? null : Number(age);

    const vacNum =
      vaccines === '' || Number.isNaN(Number(vaccines))
        ? 0
        : Number(vaccines);

    const formData = {
      nombre: name.trim(),
      tipo: type.trim(),
      raza: breed.trim(),
      edad: edadNum,
      cantidadVacunas: vacNum,
      foto: pet?.foto ?? null,
    };

    try {
      if (isEdit && (pet._id || pet.id)) {
        await editPet(pet._id || pet.id, formData);
      } else {
        await addPet(formData);
      }
      navigation.goBack();
    } catch (err) {
      console.log('Error en handleSave', err);
    }
  };

  const handleDelete = async () => {
    if (!isEdit || !pet) return;
    try {
      await removePet(pet._id || pet.id);
      navigation.goBack();
    } catch (err) {
      console.log('Error borrando mascota', err);
    }
  };

  const renderTypeButton = (value, label) => {
    const active = type === value;
    return (
      <Pressable
        onPress={() => setType(value)}
        style={[
          styles.typeBtn,
          active && styles.typeBtnActive,
        ]}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Text
          style={[
            styles.typeBtnText,
            active && styles.typeBtnTextActive,
          ]}
        >
          {label}
        </Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backIcon}>←</Text>
          </Pressable>
          <Text style={styles.title}>
            {isEdit ? 'Editar Mascota' : 'Añadir Mascota'}
          </Text>
          <View style={{ width: 44 }} />
        </View>

        {/* CONTENIDO */}
        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          {/* Avatar mock + botón cámara (todavía no funcional) */}
          <View style={styles.uploaderWrap}>
            <View style={styles.avatarWrap}>
              <Image
                source={require('../../assets/avatar-placeholder.png')}
                style={styles.avatar}
              />
              <Pressable style={styles.cameraBtn}>
                <Text style={styles.cameraIcon}>📷</Text>
              </Pressable>
            </View>
            <Text style={styles.uploaderHint}>
              Foto opcional (por ahora solo decorativo)
            </Text>
          </View>

          {/* Nombre */}
          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Introduce el nombre"
            />
          </View>

          {/* Tipo: botones Perro / Gato */}
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de animal</Text>
            <View style={styles.typeRow}>
              {renderTypeButton('Perro', 'Perro')}
              {renderTypeButton('Gato', 'Gato')}
            </View>
          </View>

          {/* Raza */}
          <View style={styles.field}>
            <Text style={styles.label}>Raza</Text>
            <Input
              value={breed}
              onChangeText={setBreed}
              placeholder="Ej: Caniche, Siamés…"
            />
          </View>

          {/* Edad */}
          <View style={styles.field}>
            <Text style={styles.label}>Edad (en años)</Text>
            <Input
              value={age}
              onChangeText={setAge}
              placeholder="Ej: 2"
              keyboardType="numeric"
            />
          </View>

          {/* Cantidad de vacunas (opcional) */}
          <View style={styles.field}>
            <Text style={styles.label}>Cantidad de vacunas (opcional)</Text>
            <Input
              value={vaccines}
              onChangeText={setVaccines}
              placeholder="Ej: 3"
              keyboardType="numeric"
            />
          </View>

          {/* Botones guardar / borrar */}
          <View style={{ marginTop: 24, gap: 12 }}>
            <Button
              title={isEdit ? 'Guardar cambios' : 'Guardar mascota'}
              onPress={handleSave}
            />

            {isEdit && (
              <Button
                title="Borrar mascota"
                onPress={handleDelete}
                style={{ backgroundColor: '#fee2e2' }}
                textStyle={{ color: '#b91c1c' }}
              />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
