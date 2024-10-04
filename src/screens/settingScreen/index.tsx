// src/screens/homeScreen/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { goBack } from '../../services/navigatorService';
import styles from './style';

const SettingScreen: React.FC = () => {

  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
    </View>
  );
};

export default SettingScreen;