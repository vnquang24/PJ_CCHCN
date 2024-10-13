import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import styles from './style';

const SettingsScreen: React.FC = () => {
  const setIsLoggedIn = useStoreActions((actions: any) => actions.login.setIsLoggedIn);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Thêm bất kỳ logic đăng xuất nào khác ở đây (ví dụ: xóa token)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cài đặt</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingsScreen;