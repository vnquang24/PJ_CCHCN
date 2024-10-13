import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import LoginForm from '../../../components/auth/login-form';
import BiometricLogin from '../../../components/auth/login-biometric';
import { navigate } from '../../../hooks/use-navigation';
import styles from './style';

const LoginScreen = () => {

  const setIsLoggedIn = useStoreActions((actions: any) => actions.login.setIsLoggedIn);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleLogin = (email: string, password: string) => {
    // Thực hiện logic đăng nhập ở đây
    // Nếu đăng nhập thành công:
    setIsLoggedIn(true);
    // Nếu đăng nhập thất bại:
    // setLoginError('Email hoặc mật khẩu không đúng');
  };

  const handleBiometricLogin = () => {
    // Xử lý đăng nhập bằng sinh trắc học
  };

  const navigateToForgotPassword = () => {
    navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <LoginForm onSubmit={handleLogin} />
      {loginError && <Text style={styles.errorText}>{loginError}</Text>}
      <TouchableOpacity onPress={navigateToForgotPassword}>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <BiometricLogin onBiometricLogin={handleBiometricLogin} />
    </View>
  );
};

export default LoginScreen;