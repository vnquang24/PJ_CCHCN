import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  control: {
    padding: 15,
    borderRadius: 30,
    backgroundColor: '#007AFF',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  capture: {
    backgroundColor: '#fff',
    borderRadius: 40,
    padding: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default styles;