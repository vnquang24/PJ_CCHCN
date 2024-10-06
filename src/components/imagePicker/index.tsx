import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import styles from './style';

interface ImagePickerProps {
  onImageSelected: (uri: string) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onImageSelected }) => {
  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('Người dùng đã hủy chọn ảnh');
      } else if (response.errorCode) {
        console.log('Lỗi: ', response.errorMessage);
      } else {
        const source = response.assets?.[0]?.uri;
        if (source) {
          onImageSelected(source);
        }
      }
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleChooseImage}>
      <Text style={styles.text}>Chọn ảnh từ thư viện</Text>
    </TouchableOpacity>
  );
};

export default ImagePicker;