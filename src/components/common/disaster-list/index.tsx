import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { navigate } from '../../../services/navigator-service';
import styles from './style';

interface Disaster {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface DisasterListProps {
  disasters: Disaster[];
}

const DisasterList: React.FC<DisasterListProps> = ({ disasters }) => {
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

  return (
    <FlatList
      data={disasters}
      renderItem={renderDisasterItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default DisasterList;