import React, { useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { navigate } from '../../services/navigatorService'; // Use navigation service
import styles from './style'; // Import styles from a separate file
import { useStoreActions } from '../../store';

const CameraScreen: React.FC = () => {
  const cameraRef = useRef<RNCamera | null>(null);
  const setUri = useStoreActions((actions) => actions.camera.setUri);
  const takePicture = useCallback(async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setUri(data.uri);
      navigate('Form'); // Use navigation service
    }
  }, []);

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={styles.snapText}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;