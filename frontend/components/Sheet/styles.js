import { StyleSheet, Dimensions } from 'react-native';
const SHEET_MAX = Math.round(Dimensions.get('window').height * 0.6);

export default StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    maxHeight: SHEET_MAX,
    backgroundColor: '#f6f8f6',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 8
  },
  handleWrap: { alignItems: 'center', paddingTop: 6 },
  handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: '#d1d5db' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 8
  },
  title: { fontSize: 20, fontWeight: '800' },
  body: { paddingBottom: 16 }
});
