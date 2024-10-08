import React from 'react';
import { View, FlatList } from 'react-native';
import { useStoreState, useStoreActions } from '../../../store';
import MediaViewer from '../MediaViewer';
import styles from './style';
import { MediaItem } from '../../../store/models/cameraModel';

const MediaGallery: React.FC = () => {
  const mediaItems = useStoreState((state) => state.camera.mediaItems);
  const removeMedia = useStoreActions((actions) => actions.camera.removeMedia);

  const renderMediaItem = ({ item, index }: { item: MediaItem; index: number }) => (
    <MediaViewer 
      uri={item.uri} 
      type={item.type as 'photo' | 'video'} 
      onDelete={() => removeMedia(index)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaItems}
        renderItem={renderMediaItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default MediaGallery;