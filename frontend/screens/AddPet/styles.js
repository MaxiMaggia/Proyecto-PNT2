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

  // Uploader
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

  // Campos
  field: { marginTop: 10 },
  label: { color: '#e2e8f0', fontWeight: '700', marginBottom: 6 },

  // Toggle Perro/Gato
  typeRow: {
    flexDirection: 'row',
    gap: 10
  },
  typeBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)'
  },
  typeBtnActive: {
    backgroundColor: '#13ec13',
    borderColor: '#13ec13'
  },
  typeBtnTxt: {
    fontWeight: '800',
    color: '#ffffff'
  },
  typeBtnTxtActive: {
    color: '#102210'
  },

  // Acciones
  actionsCol: { marginTop: 18, gap: 10 },

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
  btnDangerTxt: { color: '#ffffff', fontWeight: '800' }
});
