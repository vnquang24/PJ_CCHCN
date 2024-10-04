// src/screens/homeScreen/index.tsx
import React, { useState } from 'react';
import { useStoreActions, useStoreState } from '../../store';
import { View, Text, Button, Image, FlatList, TouchableOpacity } from 'react-native';
import { goBack, navigate } from '../../services/navigatorService';
import Modal from 'react-native-modal';
import styles from './style';

const FormScreen: React.FC = () => {
  const increment = useStoreActions((actions) => actions.counter.increment);
  const count = useStoreState((state) => state.counter.count);
  const imageUri = useStoreState((state) => state.camera.uri);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

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
      {imageUri ? (
        <TouchableOpacity onPress={toggleModal}>
          <Image source={{ uri: imageUri }} style={styles.photo} />
        </TouchableOpacity>
      ) : (
        <Text>No image captured yet</Text>
      )}
      <Modal 
        isVisible={isModalVisible} 
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Image source={{ uri: imageUri }} style={styles.fullScreenImage} />
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>   
      </View>
  );
};

export default FormScreen;