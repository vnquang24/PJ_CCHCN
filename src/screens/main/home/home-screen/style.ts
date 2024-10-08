import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
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
  loaderStyle: {
    marginVertical: 16,
    alignItems: 'center',
  },
  allLoadedContainer: {
    padding: 16,
    alignItems: 'center',
  },
  allLoadedText: {
    fontSize: 16,
    color: '#666',
  },
  loadMoreButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
  },
  loadMoreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;