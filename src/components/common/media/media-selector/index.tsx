import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Modal } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Camera from '../camera';
import MediaForm from '../media-form';
import styles from './style';
import { Image } from '../../../../store/models/disaster-models';
interface MediaSelectorProps {
  onMediaSelected: (uri: string, type: 'photo' | 'video', des: string, coordinates: { lat: number, lng: number }) => void;
}

const MediaSelector: React.FC<MediaSelectorProps> = ({ onMediaSelected }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showMediaForm, setShowMediaForm] = useState(false);
  const [capturedMedia, setCapturedMedia] = useState<{ uri: string; type: 'photo' | 'video' } | null>(null);

  const handleCameraPress = () => {
    setModalVisible(false);
    setShowCamera(true);
  };

  const handleGalleryPress = () => {
    launchImageLibrary({ mediaType: 'mixed' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        if (asset.uri) {
          setCapturedMedia({ uri: asset.uri, type: asset.type === 'video' ? 'video' : 'photo' });
          setShowMediaForm(true);
        }
      }
    });
    setModalVisible(false);
  };
  useEffect(() => {
    console.log("showMediaForm changed:", showMediaForm);
  }, [showMediaForm]);

  const handleCapture = (uri: string, type: 'photo' | 'video') => {
 //   console.log('Capture:', uri, type);
 console.log("Capture: " + showMediaForm);
    setShowCamera(false);
    setCapturedMedia({ uri, type });
    setShowMediaForm(true);
  };

  const handleMediaFormSubmit = (mediaInfo: Omit<Image, 'id'>) => {
   // console.log('Media form submitted:', mediaInfo);
   console.log("MediaForm submitted: " + showMediaForm);
    setShowMediaForm(false);
    onMediaSelected(mediaInfo.uri, mediaInfo.type, mediaInfo.des, mediaInfo.coordinates);
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
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleCameraPress}
            >
              <Text style={styles.modalOptionText}>Chụp ảnh/quay video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleGalleryPress}
            >
              <Text style={styles.modalOptionText}>Chọn từ thư viện</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showMediaForm} animationType="slide">
        {capturedMedia && (
          <MediaForm
            onSubmit={handleMediaFormSubmit}
            mediaUri={capturedMedia.uri}
            mediaType={capturedMedia.type}
          />
        )}
      </Modal>

      <Modal visible={showCamera} animationType="slide">
        <Camera onCapture={handleCapture} />
      </Modal>

     
    </View>
  );
}

export default MediaSelector;