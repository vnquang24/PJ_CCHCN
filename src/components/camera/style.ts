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
    //padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  control: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  text: {
    color: '#fff',
  },
  capture: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureText: {
    fontSize: 17,
  },
});

export default styles;