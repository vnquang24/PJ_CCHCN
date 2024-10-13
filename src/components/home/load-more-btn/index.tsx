import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './style';

interface LoadMoreButtonProps {
  isLoading: boolean;
  allLoaded: boolean;
  onLoadMore: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ isLoading, allLoaded, onLoadMore }) => {
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
  return (
    <TouchableOpacity style={styles.loadMoreButton} onPress={onLoadMore}>
      <Text style={styles.loadMoreButtonText}>Tải thêm</Text>
    </TouchableOpacity>
  );
};

export default LoadMoreButton;