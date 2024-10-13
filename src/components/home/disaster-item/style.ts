import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  disasterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  disasterIcon: {
    marginRight: 15,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disasterInfo: {
    flex: 1,
  },
  disasterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  disasterTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  disasterLocation: {
    fontSize: 14,
    color: '#666',
  },
  disasterDamageLevel: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
  },
});

export default styles;