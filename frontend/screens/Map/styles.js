import { StyleSheet, Dimensions } from 'react-native';

const SHEET_MAX = Math.round(Dimensions.get('window').height * 0.6);
export const DRAG_MAX = 240;

// Paleta
const BG_DARK = '#102210';                 // fondo general
const GREEN_APPBAR = 'rgba(16,34,16,0.97)';// franja del título (verde oscuro)
const GREEN_SHEET = '#133A13';             // fondo del bottom sheet
const TEXT_PRIMARY = '#F1FAF1';
const TEXT_SECONDARY = '#CFE8CF';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_DARK },

  // mapa único
  mapBg: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },

  // Header verde detrás del AppBar (RECTO: sin bordes redondeados)
  appBarBg: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    backgroundColor: GREEN_APPBAR,
    // ❌ quitamos bordes redondeados
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4
  },
  appBarWrap: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    paddingHorizontal: 12
  },

  // Chip de ruta
  routeChip: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  routeChipTxt: { fontWeight: '700', color: '#0f172a' },
  routeChipClose: {
    width: 24, height: 24, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#e2e8f0'
  },
  routeChipCloseTxt: { fontSize: 12, fontWeight: '800', color: '#0f172a' },

  // Bottom sheet (verde)
  sheet: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    maxHeight: SHEET_MAX,
    backgroundColor: GREEN_SHEET,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 12,
    zIndex: 20,
    elevation: 6
  },
  sheetHandleWrap: { alignItems: 'center', paddingTop: 4, paddingBottom: 6 },
  sheetHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: '#2E5B2E' },
  sheetTitle: { fontSize: 20, fontWeight: '800', marginBottom: 8, color: TEXT_PRIMARY },
  loading: { paddingBottom: 12, color: TEXT_SECONDARY },

  // Tarjetas dentro del sheet (BLANCAS con texto negro)
  card: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#ffffff',            // ← blanco
    borderRadius: 12,
    paddingVertical: 10, paddingHorizontal: 12,
    marginBottom: 10
  },
  cardTitle: { fontSize: 16, fontWeight: '800', color: '#0f172a' },  // texto oscuro
  cardSub: { color: '#475569' },                                      // gris oscuro legible

  badgeBase: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginLeft: 8 },
  badgeOpen:  { backgroundColor: 'rgba(20, 180, 120, 0.18)' },
  badgeClosed:{ backgroundColor: 'rgba(239,68,68,0.18)' },
  badgeText:  { color: '#0f172a', fontWeight: '700' },                // texto oscuro sobre badge claro
  distance:   { marginLeft: 8, color: '#334155', fontWeight: '700' },

  // Panel de info/opiniones (tarjeta blanca sobre el mapa)
  infoPanel: {
    position: 'absolute',
    left: 12, right: 12, bottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 3 },
    elevation: 4
  },
  dirHeader: { height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dirBackBtn: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#f1f5f9'
  },
  dirBackIcon: { fontSize: 18, fontWeight: '700', color: '#0f172a' },
  dirTitle: { fontSize: 18, fontWeight: '800', color: '#0f172a' },
  dirSub: { marginTop: 6, marginBottom: 10, color: '#334155', fontWeight: '600' },

  rateRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  stars: { color: '#FBBF24', fontSize: 16 },
  rateNum: { fontWeight: '800', color: '#0f172a' },
  rateCount: { color: '#64748b' },

  reviewBox: { backgroundColor: '#f8fafc', borderRadius: 12, padding: 10, marginBottom: 10 },
  reviewText: { color: '#0f172a' },
  reviewMeta: { marginTop: 6, color: '#64748b', fontStyle: 'italic' },

  dirActions: { marginTop: 6, flexDirection: 'row', justifyContent: 'space-between' },

  // Botones
  btn: {
    backgroundColor: '#13ec13',
    height: 44, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 18
  },
  btnTxt: { color: '#102210', fontWeight: '800' },

  btnOutline: {
    borderWidth: 2, borderColor: '#102210',
    height: 44, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 18
  },
  btnOutlineTxt: { color: '#102210', fontWeight: '800' },

  btnGhost: {
    height: 44, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 18
  },
  btnGhostTxt: { color: '#555', fontWeight: '800' },

  // Modal filtros
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center' },
  modalCard: { width: '86%', backgroundColor: '#ffffff', borderRadius: 12, padding: 16 },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 8 },
  label: { fontWeight: '700', marginTop: 8, marginBottom: 6 },
  input: { height: 44, borderRadius: 10, backgroundColor: '#f3f4f6', paddingHorizontal: 12 },
  modalRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }
});
