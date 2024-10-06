import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  text: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    padding: 6,
    fontSize: 16,
    color: '#333',
  },
});

export default styles;