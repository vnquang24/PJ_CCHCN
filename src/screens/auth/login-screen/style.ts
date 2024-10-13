import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default styles;