// src/screens/homeScreen/index.tsx
import React, { useState } from 'react';
import { useStoreActions, useStoreState } from '../../store';
import { View, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { navigate } from '../../services/navigatorService';
import MediaViewer from '../../components/MediaViewer';
import styles from './style';

const FormScreen: React.FC = () => {
  const increment = useStoreActions((actions) => actions.counter.increment);
  const count = useStoreState((state) => state.counter.count);
  const mediaUri = useStoreState((state) => state.camera.uri);
  const mediaType = useStoreState((state) => state.camera.mediaType);
  

  return (
    <View style={styles.container}>
      <Text>Form Screen</Text>
      <Text>{count}</Text>
      <Button
        title="Increment"
        onPress={() => increment(1)}
      />
      <Button
        title="Decrement"
        onPress={() => increment(-1)}
      />

      <Button
        title="Go to Camera"
        onPress={() => navigate('Camera')}
      />
      {mediaUri && mediaType && (
        <MediaViewer uri={mediaUri} type={mediaType} />
      )}   
    </View>
  );
};

export default FormScreen;