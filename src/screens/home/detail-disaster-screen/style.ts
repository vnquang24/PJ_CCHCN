import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 16,
    flex: 1,
  },
  disasterIcon: {
    marginRight: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#ff3b30',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default styles;