import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const VerificationCodeScreen: React.FC = () => {
  const [code, setCode] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (code === '123456') {
      navigation.navigate('ResetPassword' as never);
    } else {
      Alert.alert('Lỗi', 'Mã xác nhận không đúng');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nhập mã xác nhận</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã xác nhận"
        value={code}
        onChangeText={setCode}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationCodeScreen;