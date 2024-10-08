import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useStoreState, useStoreActions } from '../../../../store';
import MediaGallery from '../../../../components/media/media-galary';
import MediaSelector from '../../../../components/media/media-selector';
import LocationDisplay from '../../../../components/common/location-display';
import WebViewComponent from '../../../../components/common/webView';
import styles from './style';

const FormScreen: React.FC = () => {
  const mediaItems = useStoreState((state) => state.camera.mediaItems);
  const addMedia = useStoreActions((actions) => actions.camera.addMedia);

  const handleMediaSelected = (uri: string, type: 'photo' | 'video') => {
    addMedia({ uri, type });
  };

  const renderItem = ({ item }: { item: string }) => {
    switch (item) {
      case 'media':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ảnh và Video</Text>
            <View style={styles.mediaContent}>
              {mediaItems.length > 0 ? (
                <MediaGallery />
              ) : (
                <Text style={styles.noMediaText}>Chưa có ảnh hoặc video</Text>
              )}
              <MediaSelector onMediaSelected={handleMediaSelected} />
            </View>
          </View>
        );
      case 'location':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Vị trí</Text>
            <LocationDisplay />
          </View>
        );
      case 'webview':
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>WebView</Text>
            <View style={styles.webviewContainer}>
              <WebViewComponent url="https://www.npmjs.com/package/react-native-webview" />
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={['media', 'location', 'webview']}
      renderItem={renderItem}
      keyExtractor={(item) => item}
    />
  );
};

export default FormScreen;