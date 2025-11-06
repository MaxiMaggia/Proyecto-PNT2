import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { usePets } from '../../context/PetsContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { parseISOtoDate, formatDateDDMMYYYY } from '../../utils/date';

export default function AddPet({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { addPet, updatePet, deletePet } = usePets();

  const pet = route?.params?.pet || null;
  const isEdit = !!pet;

  const initialDate = useMemo(
    () => parseISOtoDate(pet?.birthDate) || new Date(2020, 4, 15),
    [pet]
  );

  const [name, setName] = useState(pet?.name || '');
  const [type, setType] = useState(pet?.type || 'Perro');
  const [breed, setBreed] = useState(pet?.breed || '');
  const [birthDate, setBirthDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (isEdit) {
      setName(pet?.name || '');
      setType(pet?.type || 'Perro');
      setBreed(pet?.breed || '');
      setBirthDate(parseISOtoDate(pet?.birthDate) || new Date(2020, 4, 15));
    }
  }, [isEdit, pet]);

  const goBack = () => navigation.goBack();

  const onChangeDate = (_ev, selected) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selected) setBirthDate(selected);
  };

  const handleSave = () => {
    const payload = {
      name: name.trim() || 'Mi mascota',
      type: type.trim() || 'Perro',
      breed: breed.trim(),
      birthDate: birthDate?.toISOString(),
    };
    if (isEdit) updatePet(pet.id, payload);
    else addPet({ id: Date.now(), ...payload });
    navigation.navigate('PetList');
  };

  const handleDelete = () => {
    if (!isEdit) return;
    deletePet(pet.id);
    navigation.navigate('PetList');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backBtn}><Text style={styles.backIcon}>←</Text></Pressable>
          <Text style={styles.title}>{isEdit ? 'Editar Mascota' : 'Añadir Mascota'}</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          {/* avatar mock + botón de cámara no funcional todavia */}
          <View style={styles.uploaderWrap}>
            <View style={styles.avatarWrap}>
              <Image source={require('../../assets/avatar-placeholder.png')} style={styles.avatar} />
              <Pressable style={styles.cameraBtn}><Text style={styles.cameraIcon}>📷</Text></Pressable>
            </View>
            <Text style={styles.uploaderHint}>Foto opcional (no funcional por ahora)</Text>
          </View>

          <View style={styles.field}><Text style={styles.label}>Nombre</Text>
            <Input value={name} onChangeText={setName} placeholder="Introduce el nombre" />
          </View>

          <View style={styles.field}><Text style={styles.label}>Tipo de animal</Text>
            <Input value={type} onChangeText={setType} placeholder="Perro / Gato" />
          </View>

          <View style={styles.field}><Text style={styles.label}>Raza</Text>
            <Input value={breed} onChangeText={setBreed} placeholder="Empieza a escribir…" />
          </View>

          <View style={styles.field}><Text style={styles.label}>Fecha de nacimiento</Text>
            <Pressable style={styles.dateBtn} onPress={() => setShowPicker(true)}>
              <Text style={styles.dateBtnTxt}>{formatDateDDMMYYYY(birthDate)}</Text>
            </Pressable>

            {showPicker && Platform.OS === 'android' && (
              <DateTimePicker value={birthDate} mode="date" display="calendar" onChange={onChangeDate} maximumDate={new Date()} />
            )}

            {showPicker && Platform.OS === 'ios' && (
              <View style={styles.iosPickerCard}>
                <DateTimePicker value={birthDate} mode="date" display="compact" onChange={onChangeDate} maximumDate={new Date()} />
                <View style={styles.iosPickerActions}>
                  <Pressable style={styles.btnGhost} onPress={() => setShowPicker(false)}><Text style={styles.btnGhostTxt}>Cancelar</Text></Pressable>
                  <Button title="Listo" onPress={() => setShowPicker(false)} />
                </View>
              </View>
            )}
          </View>

          <View style={styles.actionsCol}>
            <Button title={isEdit ? 'Guardar Cambios' : 'Guardar Mascota'} onPress={handleSave} />
            {isEdit ? (
              <Pressable style={styles.btnDanger} onPress={handleDelete}><Text style={styles.btnDangerTxt}>Borrar Mascota</Text></Pressable>
            ) : (
              <Pressable style={styles.btnGhost} onPress={goBack}><Text style={styles.btnGhostTxt}>Cancelar</Text></Pressable>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
