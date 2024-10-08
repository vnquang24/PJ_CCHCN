import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  loading: {
    marginTop: 10,
  },
});

export default styles;