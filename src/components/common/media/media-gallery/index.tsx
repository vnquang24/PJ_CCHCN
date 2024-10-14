import React from 'react';
import { View, FlatList } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import MediaViewer from '../media-view';
import styles from './style';
import { Image as DisasterImage } from '../../../../store/models/disaster-models';

interface MediaGalleryProps {
  isEditing: boolean;
  disasterId: number;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({ isEditing, disasterId }) => {
  const removeImage = useStoreActions((actions: any) => actions.disaster.removeImage);
  const images = useStoreState((state: any) => 
    state.disaster.disasters.find((d: any) => d.id === disasterId)?.images || []
  );

  const handleDeleteImage = (imageId: number) => {
    removeImage({ disasterId, imageId });
  };

  const renderMediaItem = ({ item }: { item: DisasterImage }) => (
    <View style={styles.mediaItemContainer}>
      <MediaViewer 
        uri={item.uri} 
        type={item.type}
        onDelete={isEditing ? () => handleDeleteImage(item.id) : undefined}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        renderItem={renderMediaItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default MediaGallery;