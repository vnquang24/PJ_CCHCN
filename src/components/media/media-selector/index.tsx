import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal, TouchableWithoutFeedback } from 'react-native';
import { navigate } from '../../../services/navigator-service';
import ImagePicker from '../image-picker';
import styles from './style';

interface MediaSelectorProps {
  onMediaSelected: (uri: string, type: 'photo' | 'video') => void;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ onMediaSelected }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleCameraPress = () => {
    setModalVisible(false);
    navigate('Camera');
  };

  const handleImageSelected = (uri: string) => {
    setModalVisible(false);
    onMediaSelected(uri, 'photo');
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.buttonText}>Thêm ảnh/video</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleCameraPress}
              >
                <Text style={styles.modalOptionText}>Chụp ảnh/quay video</Text>
              </TouchableOpacity>
              <ImagePicker onImageSelected={handleImageSelected} />
              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default MediaSelector;