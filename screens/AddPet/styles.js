import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#102210' },

  header: {
    height: 64,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  backBtn: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)'
  },
  backIcon: { fontSize: 18, fontWeight: '700', color: '#ffffff' },
  title: { fontSize: 18, fontWeight: '800', color: '#ffffff' },

  uploaderWrap: { alignItems: 'center', marginTop: 10, marginBottom: 14 },
  avatarWrap: { position: 'relative' },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#0b1210' },
  cameraBtn: {
    position: 'absolute', right: -2, bottom: -2,
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#13ec13'
  },
  cameraIcon: { fontSize: 18, fontWeight: '800', color: '#102210' },
  uploaderHint: { marginTop: 6, color: '#cbd5e1' },

  field: { marginTop: 10 },
  label: { color: '#e2e8f0', fontWeight: '700', marginBottom: 6 },
  input: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f6f8f6',
    color: '#0f172a'
  },

  dateBtn: {
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f6f8f6',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  dateBtnTxt: { color: '#0f172a', fontWeight: '700' },

  // iOS picker compacto
  iosPickerCard: {
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10
  },
  pickerWrap: { alignItems: 'flex-start' },
  picker: { height: 44, alignSelf: 'stretch' },
  iosPickerActions: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  // Acciones
  actionsCol: { marginTop: 18, gap: 10 },

  btn: {
    backgroundColor: '#13ec13',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18
  },
  btnTxt: { color: '#102210', fontWeight: '800' },

  btnGhost: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  btnGhostTxt: { color: '#ffffff', fontWeight: '800' },

  // Botón rojo para borrar
  btnDanger: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    backgroundColor: '#ef4444'
  },
  btnDangerTxt: { color: '#ffffff', fontWeight: '800' },

  typeRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#cbd5f5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  typeBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  typeBtnTextActive: {
    color: '#ffffff',
  },
  // Select estilo input
selectBox: {
  height: 48,
  borderRadius: 12,
  paddingHorizontal: 12,
  justifyContent: 'center',
  backgroundColor: '#f6f8f6',
  marginTop: 8,
},

selectText: {
  color: '#0f172a',
  fontSize: 16,
  fontWeight: '400',
},

// Modal
modalOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.45)',
  justifyContent: 'center',
  alignItems: 'center',

  zIndex: 99999,
  elevation: 99999,  
},

modalBox: {
  width: '80%',
  backgroundColor: '#ffffff',
  borderRadius: 12,
  paddingVertical: 10,

  // sombras opcionales
  elevation: 8,
  shadowColor: '#000',
  shadowOpacity: 0.25,
  shadowRadius: 8,

  zIndex: 100000,
},


modalOption: {
  paddingVertical: 14,
  paddingHorizontal: 18,
},

modalOptionText: {
  fontSize: 16,
  color: '#0f172a',
},
});

