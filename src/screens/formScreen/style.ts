import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    photo: {
        width: 100,
        height: 100,
        margin: 5,
      },
    image: {
        width: 100,
        height: 100,
        margin: 5,
    },
    modal: {
        margin: 0,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    fullScreenImage: {
        width: width,
        height: height,
        resizeMode: 'contain',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;