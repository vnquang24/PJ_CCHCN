// src/screens/homeScreen/index.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { goBack } from '../../services/navigatorService';
import styles from './style';

const DetailOfListScreen: React.FC = () => {

  return (
    <View style={styles.container}>
      <Text>Detail of List Screen</Text>
      <Button
        title="Go to home"
        onPress={() => goBack()}
      />
    </View>
  );
};

export default DetailOfListScreen;