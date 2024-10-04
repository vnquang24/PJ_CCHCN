// src/screens/loginScreen/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { navigate } from '../../services/navigatorService';
import styles from './style';

const LoginScreen: React.FC = () => {

  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigate('Home')}
      />
    </View>
  );
};

export default LoginScreen;