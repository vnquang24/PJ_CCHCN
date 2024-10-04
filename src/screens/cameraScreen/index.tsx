import React from 'react';
import { View } from 'react-native';
import { navigate } from '../../services/navigatorService';
import { useStoreActions } from '../../store';
import Camera from '../../components/camera'; // Import Camera component
import styles from './style';

const CameraScreen: React.FC = () => {
  const setMedia = useStoreActions((actions) => actions.camera.setMedia);

  const handleCapture = (uri: string, type: 'photo' | 'video') => {
    setMedia({ uri, type });
    navigate('Form');
    console.log(uri, type);
  };

  return (
    <View style={styles.container}>
      <Camera onCapture={handleCapture} />
    </View>
  );
};

export default CameraScreen;