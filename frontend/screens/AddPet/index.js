import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Pressable, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './styles';
import { usePets } from '../../context/PetsContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
// Nota: ya no usamos el calendario ni las utils de fecha

export default function AddPet({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { addPet, updatePet, deletePet } = usePets();

  const pet = route?.params?.pet || null;
  const isEdit = !!pet;

  const [name, setName]   = useState(pet?.nombre || pet?.name || '');
  const [type, setType]   = useState(pet?.tipo   || pet?.type || ''); // 'Perro' | 'Gato'
  const [breed, setBreed] = useState(pet?.raza   || pet?.breed || '');
  const [age, setAge]     = useState(pet?.edad ? String(pet.edad) : '');
  const [err, setErr]     = useState('');

  useEffect(() => {
    if (isEdit) {
      setName(pet?.nombre || pet?.name || '');
      setType(pet?.tipo || pet?.type || '');
      setBreed(pet?.raza || pet?.breed || '');
      setAge(pet?.edad ? String(pet.edad) : '');
    }
  }, [isEdit, pet]);

  const goBack = () => navigation.goBack();

  const handleSave = async () => {
    setErr('');
    const tipoNorm = type === 'Gato' ? 'Gato' : (type === 'Perro' ? 'Perro' : '');
    if (!name.trim())     return setErr('El nombre es obligatorio');
    if (!tipoNorm)        return setErr('Indicá si es Perro o Gato');
    if (!breed.trim())    return setErr('La raza es obligatoria');

    try {
      const payload = {
        nombre: name.trim(),
        tipo:   tipoNorm,
        raza:   breed.trim(),
        ...(age ? { edad: Number(age) } : {})
      };

      if (isEdit) {
        const id = pet?._id || pet?.id;
        await updatePet(id, payload);
      } else {
        await addPet(payload);
      }
      navigation.navigate('PetList');
    } catch (e) {
      setErr(e.message || 'Error guardando');
    }
  };

  const handleDelete = async () => {
    if (!isEdit) return;
    const id = pet?._id || pet?.id;
    try {
      await deletePet(id);
      navigation.navigate('PetList');
    } catch (e) {
      setErr(e.message || 'No se pudo borrar');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backBtn}>
            <Text style={styles.backIcon}>{'\u2190'}</Text>
          </Pressable>
          <Text style={styles.title}>{isEdit ? 'Editar Mascota' : 'Añadir Mascota'}</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          {/* Avatar mock + cámara (no funcional por ahora) */}
          <View style={styles.uploaderWrap}>
            <View style={styles.avatarWrap}>
              <Image source={require('../../assets/avatar-placeholder.png')} style={styles.avatar} />
              <Pressable style={styles.cameraBtn}>
                <Text style={styles.cameraIcon}>{'\uD83D\uDCF7'}</Text>
              </Pressable>
            </View>
            <Text style={styles.uploaderHint}>Foto opcional (no funcional por ahora)</Text>
          </View>

          {!!err && <Text style={{ color: '#ef4444', marginBottom: 8 }}>{err}</Text>}

          <View style={styles.field}>
            <Text style={styles.label}>Nombre</Text>
            <Input value={name} onChangeText={setName} placeholder="Introduce el nombre" />
          </View>

          {/* Tipo de animal: botones Perro / Gato */}
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de animal</Text>
            <View style={styles.typeRow}>
              <Pressable
                onPress={() => setType('Perro')}
                style={[styles.typeBtn, type === 'Perro' && styles.typeBtnActive]}
                accessibilityRole="button"
                accessibilityLabel="Seleccionar Perro"
              >
                <Text style={[styles.typeBtnTxt, type === 'Perro' && styles.typeBtnTxtActive]}>Perro</Text>
              </Pressable>

              <Pressable
                onPress={() => setType('Gato')}
                style={[styles.typeBtn, type === 'Gato' && styles.typeBtnActive]}
                accessibilityRole="button"
                accessibilityLabel="Seleccionar Gato"
              >
                <Text style={[styles.typeBtnTxt, type === 'Gato' && styles.typeBtnTxtActive]}>Gato</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Raza</Text>
            <Input
              value={breed}
              onChangeText={setBreed}
              placeholder="Ej: Caniche, Persa…"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Edad (años, opcional)</Text>
            <Input keyboardType="numeric" value={age} onChangeText={setAge} placeholder="0" />
          </View>

          <View style={styles.actionsCol}>
            <Button title={isEdit ? 'Guardar Cambios' : 'Guardar Mascota'} onPress={handleSave} />
            {isEdit ? (
              <Pressable style={styles.btnDanger} onPress={handleDelete}>
                <Text style={styles.btnDangerTxt}>Borrar Mascota</Text>
              </Pressable>
            ) : (
              <Pressable style={styles.btnGhost} onPress={goBack}>
                <Text style={styles.btnGhostTxt}>Cancelar</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
