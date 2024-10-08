import React from 'react';
import { View } from 'react-native';
import { navigate } from '../../../../services/navigator-service';
import { useStoreActions } from '../../../../store';
import Camera from '../../../../components/media/camera';
import styles from './style';

const CameraScreen: React.FC = () => {
  const addMedia = useStoreActions((actions) => actions.camera.addMedia);

  const handleCapture = (uri: string, type: 'photo' | 'video') => {
    addMedia({ uri, type });
    navigate('Form');
  };

  return (
    <View style={styles.container}>
      <Camera onCapture={handleCapture} />
    </View>
  );
};

export default CameraScreen;