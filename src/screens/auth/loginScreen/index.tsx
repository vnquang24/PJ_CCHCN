import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import styles from './style';
import LoginByPass from '../../../components/auth/loginByPass';
import LoginByBio from '../../../components/auth/loginByBio';
import { navigate } from '../../../services/navigatorService'


const LoginScreen: React.FC = () => {
  const handleForgotPassword = () => {
    navigate('ForgotPassword' as never);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <LoginByPass />
        <View style={styles.biometricContainer}>
          <LoginByBio />
        </View>
        <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;