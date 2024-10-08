import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  disasterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  disasterIcon: {
    marginRight: 16,
  },
  disasterInfo: {
    flex: 1,
  },
  disasterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  disasterDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default styles;