import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { useStoreActions, useStoreState } from '../../../../store';
import { navigate } from '../../../../services/navigator-service';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';
import { Disaster } from '../../../../store/models/disaster-model';

const HomeScreen: React.FC = () => {
  const disasters = useStoreState((state) => state.disaster.disasters);
  const setDisasters = useStoreActions((actions) => actions.disaster.setDisasters);
  const [displayedDisasters, setDisplayedDisasters] = useState<Disaster[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Khởi tạo 20 tình huống thảm họa
    const initialDisasters: Disaster[] = [
      { id: 1, title: 'Thảm họa 1', description: 'Mô tả thảm họa 1', icon: 'warning-outline' },
      { id: 2, title: 'Thảm họa 2', description: 'Mô tả thảm họa 2', icon: 'flame-outline' },
      { id: 3, title: 'Thảm họa 3', description: 'Mô tả thảm họa 3', icon: 'water-outline' },
      { id: 4, title: 'Thảm họa 4', description: 'Mô tả thảm họa 4', icon: 'earth-outline' },
      { id: 5, title: 'Thảm họa 5', description: 'Mô tả thảm họa 5', icon: 'thunderstorm-outline' },
      { id: 6, title: 'Thảm họa 6', description: 'Mô tả thảm họa 6', icon: 'snow-outline' },
      { id: 7, title: 'Thảm họa 7', description: 'Mô tả thảm họa 7', icon: 'nuclear-outline' },
      { id: 8, title: 'Thảm họa 8', description: 'Mô tả thảm họa 8', icon: 'alert-circle-outline' },
      { id: 9, title: 'Thảm họa 9', description: 'Mô tả thảm họa 9', icon: 'warning-outline' },
      { id: 10, title: 'Thảm họa 10', description: 'Mô tả thảm họa 10', icon: 'flame-outline' },
      { id: 11, title: 'Thảm họa 1', description: 'Mô tả thảm họa 1', icon: 'warning-outline' },
      { id: 12, title: 'Thảm họa 2', description: 'Mô tả thảm họa 2', icon: 'flame-outline' },
      { id: 13, title: 'Thảm họa 3', description: 'Mô tả thảm họa 3', icon: 'water-outline' },
      { id: 14, title: 'Thảm họa 4', description: 'Mô tả thảm họa 4', icon: 'earth-outline' },
      { id: 15, title: 'Thảm họa 5', description: 'Mô tả thảm họa 5', icon: 'thunderstorm-outline' },
      { id: 16, title: 'Thảm họa 6', description: 'Mô tả thảm họa 6', icon: 'snow-outline' },
      { id: 17, title: 'Thảm họa 7', description: 'Mô tả thảm họa 7', icon: 'nuclear-outline' },
      { id: 18, title: 'Thảm họa 8', description: 'Mô tả thảm họa 8', icon: 'alert-circle-outline' },
      { id: 19, title: 'Thảm họa 9', description: 'Mô tả thảm họa 9', icon: 'warning-outline' },
      { id: 20, title: 'Thảm họa 10', description: 'Mô tả thảm họa 10', icon: 'flame-outline' },
    ];

    setDisasters(initialDisasters);
    setDisplayedDisasters(initialDisasters.slice(0, 5));
  }, []);

  const loadMoreDisasters = useCallback(() => {
    if (displayedDisasters.length < disasters.length && !isLoading && !allLoaded) {
      setIsLoading(true);
      setTimeout(() => {
        const nextDisasters = disasters.slice(displayedDisasters.length, displayedDisasters.length + 5);
        setDisplayedDisasters(prevDisasters => [...prevDisasters, ...nextDisasters]);
        setIsLoading(false);
        if (displayedDisasters.length + nextDisasters.length >= disasters.length) {
          setAllLoaded(true);
        }
      }, 1000); // Giả lập thời gian tải 1 giây
    }
  }, [displayedDisasters, disasters, isLoading, allLoaded]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setDisplayedDisasters(disasters.slice(0, 5));
    setAllLoaded(false);
    setRefreshing(false);
  }, [disasters]);

  const renderDisasterItem = ({ item }: { item: Disaster }) => (
    <TouchableOpacity
      style={styles.disasterItem}
      onPress={() => navigate('DetailOfList', { disasterId: item.id })}
    >
      <Icon name={item.icon} size={24} color="black" style={styles.disasterIcon} />
      <View style={styles.disasterInfo}>
        <Text style={styles.disasterTitle}>{item.title}</Text>
        <Text style={styles.disasterDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (isLoading) {
      return (
        <View style={styles.loaderStyle}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    if (allLoaded) {
      return (
        <View style={styles.allLoadedContainer}>
          <Text style={styles.allLoadedText}>Đã tải hết tất cả thảm họa</Text>
        </View>
      );
    }
    if (!allLoaded && !isLoading) {
      return (
        <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreDisasters}>
          <Text style={styles.loadMoreButtonText}>Tải thêm</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedDisasters}
        renderItem={renderDisasterItem}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;