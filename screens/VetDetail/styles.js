import { StyleSheet } from 'react-native';
export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8f6', padding: 16 },
  header: { height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#e5e7eb', alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 18 },
  title: { fontSize: 18, fontWeight: '800' },
  name: { marginTop: 8, fontSize: 20, fontWeight: '800' },
  addr: { color: '#555', marginTop: 4 },
  meta: { color: '#333', fontWeight: '600', marginTop: 4 },
  btn: { backgroundColor: '#13ec13', height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  btnTxt: { color: '#102210', fontWeight: '800' }
});
