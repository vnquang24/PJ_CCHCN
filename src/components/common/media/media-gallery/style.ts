import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 5,
  },
  mediaItemContainer: {
    margin: 5,
  },
  thumbnail: {
    width: width / 3 - 20,
    height: width / 3 - 20,
    borderRadius: 10,
  },
});

export default styles;