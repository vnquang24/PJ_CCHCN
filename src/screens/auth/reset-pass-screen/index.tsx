import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ResetPassScreen: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (newPassword === confirmPassword) {
      // Giả lập API call
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 1000);
      }).then(() => {
        Alert.alert('Thành công', 'Mật khẩu đã được đổi', [
          { text: 'OK', onPress: () => navigation.navigate('Login' as never) }
        ]);
      });
    } else {
      Alert.alert('Lỗi', 'Mật khẩu không khớp');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lại mật khẩu</Text>
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu mới"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu mới"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đổi mật khẩu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetPassScreen;