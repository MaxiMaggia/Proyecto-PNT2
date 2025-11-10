import { StyleSheet } from 'react-native';

const GREEN = '#13ec13';

export default StyleSheet.create({
  container: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 8,
  },


  circleBtn: {
    width: 42,
    height: 42,
    borderRadius: 28,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },


  iconGreen: {
    color: GREEN,
    fontSize: 18,
    fontWeight: '800',
  },


  titleBase: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
  titleDark: { color: '#ffffff' },    // sobre header verde
  titleLight: { color: '#0f172a' },   // sobre header claro
});
