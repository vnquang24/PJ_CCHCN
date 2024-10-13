import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { useStoreActions, useStoreState } from '../../../store';
import { Disaster } from '../../../store/models/disaster-models';
import DisasterList from '../../../components/home/disaster-list';
import styles from './style';
import { navigate } from '../../../hooks/use-navigation';

const DisasterListScreen: React.FC = () => {
  const [displayedDisasters, setDisplayedDisasters] = useState<Disaster[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const disasters = useStoreState((state) => state.disaster.disasters);
  const fetchDisasters = useStoreActions((actions) => actions.disaster.fetchDisasters);

  useEffect(() => {
    loadInitialDisasters();
  }, []);

  const loadInitialDisasters = async () => {
    setIsLoading(true);
      await fetchDisasters();
      setDisplayedDisasters(disasters.slice(0, 5));
      setIsLoading(false);
  };

  const loadMoreDisasters = useCallback(() => {
    
    if (displayedDisasters.length < disasters.length && !isLoading) {
      setIsLoading(true);
      const nextDisasters = disasters.slice(displayedDisasters.length, displayedDisasters.length + 5);
      setDisplayedDisasters(prevDisasters => [...prevDisasters, ...nextDisasters]);
      setIsLoading(false);
      if (displayedDisasters.length + nextDisasters.length >= disasters.length) {
        setAllLoaded(true);
      }
    }
  }, [displayedDisasters, disasters, isLoading]);


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchDisasters();
      setDisplayedDisasters(disasters.slice(0, 5));
      setAllLoaded(false);
    } catch (error) {
      console.error('Failed to refresh disasters:', error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchDisasters, disasters]);

  const onPressDisaster = useCallback((disaster: Disaster) => {
    navigate('DisasterDetail', { disasterId: disaster.id });
  }, []);

  return (
    <View style={styles.container}>
      <DisasterList
        disasters={displayedDisasters}
        isLoading={isLoading}
        allLoaded={allLoaded}
        refreshing={refreshing}
        onLoadMore={loadMoreDisasters}
        onRefresh={onRefresh}
        onPressDisaster={onPressDisaster}
      />
    </View>
  );
};

export default DisasterListScreen;