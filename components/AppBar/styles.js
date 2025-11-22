import { StyleSheet } from 'react-native';

const GREEN = '#13ec13';
const DARK_BG = '#102210';

export default StyleSheet.create({
  container: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 8,
    backgroundColor: DARK_BG,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },

  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  iconGreen: {
    color: GREEN,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
  },

  titleBase: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  titleDark: { 
    color: '#ffffff',
  },    
  titleLight: { 
    color: '#0f172a',
  },  
});
