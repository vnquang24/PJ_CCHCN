import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from './style';
import { Image } from '../../../../store/models/disaster-models';

interface MediaSelectorProps {
  onCameraPress: () => void;
  onMediaSelected: (uri: string, type: 'photo' | 'video') => void;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ onCameraPress, onMediaSelected }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleGalleryPress = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          onMediaSelected(asset.uri, asset.type === 'video' ? 'video' : 'photo');
        }
      }
    });
    setModalVisible(false);
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalOption} onPress={() => { setModalVisible(false); onCameraPress(); }}>
              <Text style={styles.modalOptionText}>Chụp ảnh/quay video</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleGalleryPress}>
              <Text style={styles.modalOptionText}>Chọn từ thư viện</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default MediaSelector;
