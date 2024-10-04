import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import styles from './style';

interface MediaViewerProps {
  uri: string;
  type: 'photo' | 'video';
}

const { width, height } = Dimensions.get('window');

const MediaViewer: React.FC<MediaViewerProps> = ({ uri, type }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(true);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setIsPaused(true); // Pause video when closing modal
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
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
               // controls={true}
                fullscreenAutorotate={true}
              />
              {isPaused && (
                <View style={styles.playButton}>
                  <Text style={styles.playButtonText}>▶</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default MediaViewer;