import React, { useState } from 'react';
import { View, Alert, ActivityIndicator } from 'react-native';
import { useStoreActions } from '../../../store';
import styles from './style';
import LoginForm from '../login-form';
import { login } from '../../../services/auth-service';

const LoginByPass: React.FC = () => {
  const setIsLoggedIn = useStoreActions((actions) => actions.login.setIsLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const isSuccess = await login(email, password);
      if (isSuccess) {
        setIsLoggedIn(true);
      } else {
        Alert.alert('Lỗi đăng nhập', 'Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng nhập');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />
      ) : (
        <LoginForm onSubmit={handleLogin} />
      )}
    </View>
  );
};

export default LoginByPass;