import React from 'react';
import { View, ScrollView } from 'react-native';
import styles from './style';
import LoginByPass from '../../../components/auth/loginByPass';
import LoginByBio from '../../../components/auth/loginByBio';

const LoginScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <LoginByPass />
        <View style={styles.biometricContainer}>
          <LoginByBio />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;