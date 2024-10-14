import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style';

interface MediaViewerProps {
  uri: string;
  type: 'photo' | 'video';
  onDelete?: () => void;  // Đã thay đổi thành tùy chọn
}

const MediaViewer: React.FC<MediaViewerProps> = ({ uri, type, onDelete }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setIsPaused(true);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      toggleModal();  // Đóng modal sau khi xóa
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        {type === 'photo' ? (
          <Image source={{ uri }} style={styles.thumbnail} />
        ) : (
          <Video
            source={{ uri }}
            style={styles.thumbnail}
            paused={true}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        onSwipeComplete={toggleModal}
        swipeDirection={['down']}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Icon name="close" size={30} color="#000" />
          </TouchableOpacity>
          
          <View style={styles.mediaContainer}>
            {type === 'photo' ? (
              <Image source={{ uri }} style={styles.fullScreenMedia} resizeMode="contain" />
            ) : (
              <TouchableOpacity onPress={togglePlayPause} style={styles.videoContainer}>
                <Video
                  source={{ uri }}
                  style={styles.fullScreenMedia}
                  paused={isPaused}
                  resizeMode="contain"
                  repeat={true}
                />
                {isPaused && (
                  <View style={styles.playButton}>
                     <Icon name="play" size={30} color="#fff" />
                  </View> 
                )}
              </TouchableOpacity>
            )}
          </View>
          
          {onDelete && (  // Chỉ hiển thị nút xóa nếu onDelete được định nghĩa
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Text style={styles.deleteButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default MediaViewer;