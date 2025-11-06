import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  // 👇 volvemos al verde oscuro
  container: { flex: 1, backgroundColor: '#102210' },

  header: {
    height: 64, paddingHorizontal: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  // 👇 textos del header en blanco para contrastar
  backBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 20, fontWeight: '700', color: '#ffffff' },
  title: { fontSize: 18, fontWeight: '800', color: '#ffffff' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 48, opacity: 0.8, color: '#ffffff' },
  emptyTitle: { marginTop: 8, fontSize: 16, fontWeight: '700', color: '#ffffff' },

  // Las tarjetas siguen blancas para legibilidad sobre el fondo verde
  item: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', marginHorizontal: 12, marginTop: 10,
    borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: 12 },
  petName: { fontSize: 16, fontWeight: '800', color: '#0f172a' },
  petSub: { color: '#667' },
  chev: { fontSize: 26, paddingHorizontal: 6, color: '#334155' },

  // FAB con más aire (como te dejé) y verde consistente
  fab: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#13ec13',
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 6, shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  fabPlus: { color: '#102210', fontSize: 28, fontWeight: '800' }
});
