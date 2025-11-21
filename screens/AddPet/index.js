// screens/AddPet/index.js
import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { buildUrl, endpoints } from '../../config/api';
import axios from 'axios';


export default function AddPet({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { addPet, editPet, removePet } = usePets();

  const pet = route?.params?.pet;
  const isEdit = !!pet;

  const [name, setName] = useState(pet?.nombre || pet?.name || '');
  const [type, setType] = useState(pet?.tipo || pet?.type || ''); 
  const [breed, setBreed] = useState(pet?.raza || pet?.breed || '');
  const [breeds, setBreeds] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [age, setAge] = useState(
    pet?.edad !== undefined && pet?.edad !== null ? String(pet.edad) : ''
  );
  const [vaccines, setVaccines] = useState(
    pet?.cantidadVacunas !== undefined && pet?.cantidadVacunas !== null
      ? String(pet.cantidadVacunas)
      : ''
  );
  const [showModal, setShowModal] = useState(false);
  const [types, setTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState(null);


  // Carga los tipos de animales
  useEffect(() => {
    const fetchTypes = async () => {
      try {

        const url = "http://192.168.0.15:3000/api/animals";  
        const res = await axios.get(url);
        setTypes(res.data); 
      } catch (err) {
        console.log("Error cargando tipos:", err);
      } finally {
        setLoadingTypes(false);
      }
    };
  
    fetchTypes();
  }, []);

  // Carga las razas de los animales
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setLoadingBreeds(true);
  
        const urlTipos = "http://192.168.0.15:3000/api/animals";
        const tiposRes = await axios.get(urlTipos);
  
        const typeNormalized = type.trim().toLowerCase();
  
        const tipoEncontrado = tiposRes.data.find(
          t => t.type.trim().toLowerCase() === typeNormalized
        );
  
        if (!tipoEncontrado) {
          console.log(":", type);
          setBreeds([]);
          return;
        }
  
        const urlRaza = "http://192.168.0.15:3000/api/raza";
        const razasRes = await axios.get(urlRaza, {
          params: { typeId: tipoEncontrado.id }
        });
  
        setBreeds(razasRes.data);
  
      } catch (err) {
        console.log("Error cargando razas:", err);
      } finally {
        setLoadingBreeds(false);
      }
    };
  
    fetchBreeds();
  }, [type]);
  
  

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

          {/* Tipo de animal */}
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de animal</Text>
              <Pressable onPress={() => setShowModal(true)} style={styles.selectBox}>
                <Text style={styles.selectText}>
                  {type || "Selecciona un tipo"}
                </Text>
              </Pressable>
          </View>
        {showModal && (
          <Pressable style={styles.modalOverlay} onPress={() => setShowModal(false)}>
            <View style={styles.modalBox}>
              {types.map(t => (
                <Pressable
                  key={t.id}
                  style={styles.modalOption}
                  onPress={() => {
                    setType(t.type);
                    setShowModal(false);
                  }}
                >
                  <Text style={styles.modalOptionText}>{t.type}</Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        )}
  
          {/* Raza */}
          <View style={styles.field}>
          <Text style={styles.label}>Raza</Text>

          <Pressable onPress={() => setShowBreedModal(true)} style={styles.selectBox}>
            <Text style={styles.selectText}>
              {breed || "Selecciona una raza"}
            </Text>
          </Pressable>

          {showBreedModal && (
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowBreedModal(false)}
            >
              <View style={styles.modalBox}>

                {loadingBreeds && (
                  <Text style={styles.selectText}>Cargando razas...</Text>
                )}

                {!loadingBreeds &&
                  breeds.map(b => (
                    <Pressable
                      key={b.id}
                      style={styles.modalOption}
                      onPress={() => {
                        setBreed(b.name);
                        setShowBreedModal(false);
                      }}
                    >
                      <Text style={styles.modalOptionText}>{b.name}</Text>
                    </Pressable>
                  ))
                }

              </View>
            </Pressable>
          )}
        </View> 
          {/* Edad (opcional) */}
          <View style={styles.field}>
            <Text style={styles.label}>Edad (opcional)</Text>
            <Input
              style={{ marginTop: 8 }}
              value={age}
              onChangeText={setAge}
              placeholder="Ej: 5"
              keyboardType="numeric"
            />
          </View>

          {/* Cantidad de vacunas (opcional) */}
          <View style={styles.field}>
            <Text style={styles.label}>Cantidad de vacunas (opcional)</Text>
            <Input
              style={{ marginTop: 8 }}
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
