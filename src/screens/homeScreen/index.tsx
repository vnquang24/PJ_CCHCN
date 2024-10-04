// src/screens/homeScreen/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { navigate } from '../../services/navigatorService';
import styles from './style';

const HomeScreen: React.FC = () => {

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Detail of List"
        onPress={() => navigate('DetailOfList')}
      />
    </View>
  );
};

export default HomeScreen;