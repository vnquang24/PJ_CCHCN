import React from 'react';
import { View, Button, Text } from 'react-native';
import { navigate } from '../../services/navigatorService';
import { useStoreState, useStoreActions } from '../../store';
import MediaGallery from '../../components/mediaGalary';
import ImagePicker from '../../components/imagePicker';
import styles from './style';

const FormScreen: React.FC = () => {
  const mediaItems = useStoreState((state) => state.camera.mediaItems);
  const addMedia = useStoreActions((actions) => actions.camera.addMedia);

  const handleAddMedia = () => {
    navigate('Camera');
  };

  const handleImageSelected = (uri: string) => {
    addMedia({ uri, type: 'photo' });
  };

  return (
    <View style={styles.container}>
      {mediaItems.length > 0 ? (
        <MediaGallery />
      ) : (
        <Text>No media items</Text>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Đi đến Máy ảnh"
          onPress={handleAddMedia}
        />
        <ImagePicker onImageSelected={handleImageSelected} />
      </View>
    </View>
  );
};

export default FormScreen;