import React from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';
import { Disaster } from '../../../store/models/disaster-models';
import DisasterItem from '../disaster-item';
import styles from './style';

interface DisasterListProps {
  disasters: Disaster[];
  isLoading: boolean;
  allLoaded: boolean;
  refreshing: boolean;
  onLoadMore: () => void;
  onRefresh: () => Promise<void>;
  onPressDisaster: (disaster: Disaster) => void;
}

const DisasterList: React.FC<DisasterListProps> = ({
  disasters,
  isLoading,
  allLoaded,
  refreshing,
  onLoadMore,
  onRefresh,
  onPressDisaster,
}) => {
  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }
    return null;
  };

  return (
    <FlatList
      data={disasters}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <DisasterItem disaster={item} onPress={onPressDisaster} />}
      refreshing={refreshing}
      onRefresh={onRefresh}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
};

export default DisasterList;