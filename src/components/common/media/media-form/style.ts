import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        width: width * 0.9,
    },
    buttonContainer: {
        marginTop: 20,
        width: width * 0.9,
    },
    toggleButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        width: width * 0.9,
    },
    toggleButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    locationContainer: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15,
        width: width * 0.9,
    },
    locationText: {
        fontSize: 16,
        marginBottom: 5,
    },
    locationButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 10,
        marginTop: 10,
    },
    locationButtonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
      opacity: 0.5,
  },
});

export default styles;