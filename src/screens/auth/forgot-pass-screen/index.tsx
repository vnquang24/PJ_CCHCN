import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (email) {
      navigation.navigate('VerificationCode' as never);
    } else {
      Alert.alert('Lỗi', 'Vui lòng nhập email');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email của bạn"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Gửi mã xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;