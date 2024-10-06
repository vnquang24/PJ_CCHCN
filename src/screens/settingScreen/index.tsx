import React from 'react';
import { View, Text, Button } from 'react-native';
import { useStoreActions } from '../../store';
import styles from './style';

const SettingScreen: React.FC = () => {
  const setIsLoggedOut = useStoreActions((actions) => actions.login.setIsLoggedOut);

  const handleLogout = () => {
    setIsLoggedOut();
  };

  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
      <Button title="Đăng xuất" onPress={handleLogout} />
    </View>
  );
};

export default SettingScreen;