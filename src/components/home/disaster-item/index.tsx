import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Disaster } from '../../../store/models/disaster-models';
import styles from './style';

interface DisasterItemProps {
  disaster: Disaster;
  onPress: (disaster: Disaster) => void;
}

const DisasterItem: React.FC<DisasterItemProps> = ({ disaster, onPress }) => {
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <TouchableOpacity style={styles.disasterItem} onPress={() => onPress(disaster)}>
      <Icon name={disaster.icon || 'question-circle'} size={40} color="#007AFF" style={styles.disasterIcon} />      
      <View style={styles.disasterInfo}>
        <Text style={styles.disasterTitle}>{disaster.title}</Text>
        <Text style={styles.disasterLocation}>{disaster.location}</Text>
        <Text style={styles.disasterDamageLevel}>Mức độ: {disaster.damageLevel}</Text>
        <Text style={styles.disasterTimestamp}>{formatDate(disaster.timestamp)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DisasterItem;