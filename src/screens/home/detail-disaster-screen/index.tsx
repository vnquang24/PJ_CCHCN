import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useStoreState, useStoreActions } from '../../../store';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import DisasterForm from '../../../components/home/disaster-form'; // Import the new component
import { Disaster } from '../../../store/models/disaster-models';
import styles from './style';

type DetailOfListScreenRouteProp = RouteProp<RootStackParamList, 'DisasterDetail'>;

type Props = {
  route: DetailOfListScreenRouteProp;
};

const DetailOfListScreen: React.FC<Props> = ({ route }) => {
  const { disasterId } = route.params as { disasterId: number };
  const disaster = useStoreState((state) =>
    state.disaster.disasters.find((item) => item.id === disasterId)
  );
  const updateDisaster = useStoreActions((actions) => actions.disaster.updateDisaster);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedDisaster: Disaster) => {
    updateDisaster(updatedDisaster);
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  if (!disaster) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy thông tin về thảm họa</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name={disaster.icon || 'question-circle'} size={40} color="#007AFF" style={styles.disasterIcon} />        
        <Text style={styles.headerTitle}>{disaster.title}</Text>
      </View>
      <DisasterForm 
        disaster={disaster} 
        onSave={handleSave} 
        isEditing={isEditing} 
        onToggleEdit={toggleEdit} 
      />
    </View>
  );

};

export default DetailOfListScreen;