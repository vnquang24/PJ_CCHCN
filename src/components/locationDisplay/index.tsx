import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

const LocationDisplay: React.FC = () => {
  const [location, setLocation] = useState<string | null>(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude}, ${longitude}`);
      },
      error => console.log('Error', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Vị trí hiện tại:</Text>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{location || 'Đang lấy vị trí...'}</Text>
        <TouchableOpacity onPress={getLocation} style={styles.refreshButton}>
          <Icon name="refresh" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationDisplay;