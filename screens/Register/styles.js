import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#102210',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    maxWidth: 420,
    marginBottom: 12,
  },
  label: {
    color: '#ffffff',
    marginBottom: 6,
    fontWeight: '700',
    marginTop: 10,
  },
  primary: {
    backgroundColor: '#13ec13',
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 420,
    marginBottom: 8,
  },
  primaryText: {
    color: '#102210',
    fontWeight: '800',
  },
  link: {
    color: '#13ec13',
    fontWeight: '700',
    marginTop: 8,
  },
  error: { 
    color: '#ef4444', 
    fontSize: 12, 
    marginBottom: 12,
    marginTop: 4
  }
});
