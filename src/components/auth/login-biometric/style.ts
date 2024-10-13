import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    width: '80%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  loading: {
    marginTop: 10,
  },
  icon: {
    marginRight: 8,
  },
});

export default styles;