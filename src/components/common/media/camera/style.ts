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
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  control: {
    padding: 15,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(241, 240, 234, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 5,
  },
  zoomText: {
    color: 'white',
    fontSize: 12,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 35,
    backgroundColor: 'rgba(241, 240, 234, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;