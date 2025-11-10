// Pantalla para crear/editar mascotas, conectada al contexto y servicios de razas.
import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, Pressable, Platform, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import { usePets } from '../../context/PetsContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { parseISOtoDate, formatDateDDMMYYYY } from '../../utils/date';
import { getBreedsByType } from '../../services/breeds';
import { useDebouncedValue } from '../../hooks/useDebounce';

// Gestiona el formulario y coordina acciones en `PetsContext` y servicios auxiliares.
export default function AddPet({ navigation, route }) {
  const insets = useSafeAreaInsets();
  const { addPet, updatePet, deletePet } = usePets();

  const pet = route?.params?.pet || null;
  const isEdit = !!pet;

  // Memoriza la fecha inicial según mascota proveniente de `PetsContext`.
  const initialDate = useMemo(
    () => parseISOtoDate(pet?.birthDate) || new Date(2020, 4, 15),
    [pet]
  );

  const [name, setName] = useState(pet?.name || '');
  const [type, setType] = useState(pet?.type ?? '');
  const [breed, setBreed] = useState(pet?.breed || ''); // valor elegido
  const [birthDate, setBirthDate] = useState(initialDate);
  const [showPicker, setShowPicker] = useState(false);
  const [breedQuery, setBreedQuery] = useState(pet?.breed || '');
  const [suggestions, setSuggestions] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(false);
  const [openSuggest, setOpenSuggest] = useState(false);
  const debouncedQuery = useDebouncedValue(breedQuery, 700);

  // Sincroniza campos cuando la pantalla recibe una mascota para edición.
  useEffect(() => {
    if (isEdit) {
      setName(pet?.name || '');
      setType(pet?.type ?? '');
      setBreed(pet?.breed || '');
      setBreedQuery(pet?.breed || '');
      setBirthDate(parseISOtoDate(pet?.birthDate) || new Date(2020, 4, 15));
    }
  }, [isEdit, pet]);

  // Busca razas sugiriendo resultados en función del tipo seleccionado y la query.
  useEffect(() => {
    const q = debouncedQuery.trim();
    const normalizedType = (type || '').trim();
    if (!q) {
      setSuggestions([]);
      setLoadingBreeds(false);
      return;
    }

    let cancel = false;
    (async () => {
      try {
        setLoadingBreeds(true);
        let list = [];
        if (!normalizedType) {
          const perro = await getBreedsByType('Perro', q);
          const gato = await getBreedsByType('Gato', q);
          list = Array.from(new Set([...perro, ...gato]));
        } else {
          list = await getBreedsByType(normalizedType, q);
        }
        if (!cancel) setSuggestions(list);
      } catch {
        if (!cancel) setSuggestions([]);
      } finally {
        if (!cancel) setLoadingBreeds(false);
      }
    })();

    return () => {
      cancel = true;
    };
  }, [debouncedQuery, type]);

  // Vuelve a la pantalla anterior reutilizando la pila de navegación principal.
  const goBack = () => navigation.goBack();

  // Maneja la fecha desde el picker y cierra el modal según plataforma.
  const onChangeDate = (_ev, selected) => {
    if (Platform.OS === 'android') setShowPicker(false);
    if (selected) setBirthDate(selected);
  };

  // Persiste la mascota mediante `PetsContext` creando o actualizando en la API.
  const handleSave = async () => {
    const payload = {
      name: name.trim() || 'Mi mascota',
      type: (type || '').trim(),
      // 👇 toma la selección o, si no hubo tap, el texto escrito
      breed: (breed || breedQuery || '').trim(),
      birthDate: birthDate?.toISOString(),
    };

    if (!payload.type) { alert('Elegí “Perro” o “Gato”'); return; }

    try {
      if (isEdit) await updatePet(pet.id, payload);
      else await addPet(payload);
      navigation.navigate('PetList');
    } catch (e) {
      console.error('Error guardando mascota:', e);
      alert('No se pudo guardar. ¿Backend accesible?\n' + (e?.message || ''));
    }
  };

  // Eliminación delegada al contexto para mantener consistencia global.
  const handleDelete = async () => {
    if (!isEdit) return;
    await deletePet(pet.id);
    navigation.navigate('PetList');
  };

  return (
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
          <Pressable onPress={goBack} style={styles.backBtn}><Text style={styles.backIcon}>{'\u2190'}</Text></Pressable>
          <Text style={styles.title}>{isEdit ? 'Editar Mascota' : 'Añadir Mascota'}</Text>
          <View style={{ width: 44 }} />
        </View>

        <ScrollView
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 24 }}
        >
          {/* avatar mock + botón de cámara no funcional todavia */}
          <View style={styles.uploaderWrap}>
            <View style={styles.avatarWrap}>
              <Image source={require('../../assets/avatar-placeholder.png')} style={styles.avatar} />
              <Pressable style={styles.cameraBtn}><Text style={styles.cameraIcon}>{'\uD83D\uDCF7'}</Text></Pressable>
            </View>
            <Text style={styles.uploaderHint}>Foto opcional (no funcional por ahora)</Text>
          </View>

          <View style={styles.field}><Text style={styles.label}>Nombre</Text>
            <Input value={name} onChangeText={setName} placeholder="Introduce el nombre" />
          </View>

          {/* Tipo de animal: chips Perro/Gato (obligatorio) */}
          <View style={styles.field}>
            <Text style={styles.label}>Tipo de animal</Text>

            <View style={styles.chipRow}>
              <Pressable
                onPress={() => {
                  setType('Perro');
                  setBreed('');
                  setBreedQuery('');
                  setSuggestions([]);
                  setOpenSuggest(false);
                }}
                style={[styles.chip, type === 'Perro' && styles.chipActive]}
                accessibilityRole="button"
                accessibilityLabel="Seleccionar Perro"
              >
                <Text style={[styles.chipText, type === 'Perro' && styles.chipTextActive]}>
                  Perro
                </Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setType('Gato');
                  setBreed('');
                  setBreedQuery('');
                  setSuggestions([]);
                  setOpenSuggest(false);
                }}
                style={[styles.chip, type === 'Gato' && styles.chipActive]}
                accessibilityRole="button"
                accessibilityLabel="Seleccionar Gato"
              >
                <Text style={[styles.chipText, type === 'Gato' && styles.chipTextActive]}>
                  Gato
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Raza</Text>

            {/* contenedor relativo para posicionar el dropdown */}
            <View style={{ position: 'relative', zIndex: 50 }}>
              <Input
                value={breedQuery}
                onChangeText={(txt) => {
                  setBreedQuery(txt);
                  setOpenSuggest(!!txt);              // abrir lista si hay texto
                }}
                onFocus={() => setOpenSuggest(!!breedQuery)}
                // cerramos un ratito después para permitir el tap al item sin que el blur lo cierre
                onBlur={() => setTimeout(() => setOpenSuggest(false), 120)}
                placeholder="Empieza a escribir…"
              />

              {openSuggest && (loadingBreeds || suggestions.length > 0) && (
                <View
                  style={{
                    marginTop: 6,
                    borderRadius: 12,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    overflow: 'hidden',
                    zIndex: 10,
                    elevation: 6,
                    maxHeight: 180,
                  }}
                >
                  {loadingBreeds ? (
                    <Text style={{ padding: 10, color: '#334155' }}>Buscando…</Text>
                  ) : (
                    <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                      {suggestions.map((item, i) => (
                        <Pressable
                          key={item + i}
                          onPress={() => {
                            setBreed(item);
                            setBreedQuery(item);
                            setSuggestions([]);
                          }}
                          style={{ padding: 10 }}
                        >
                          <Text style={{ color: '#0f172a', fontWeight: '700' }}>{item}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  )}
                </View>
              )}
            </View>
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

