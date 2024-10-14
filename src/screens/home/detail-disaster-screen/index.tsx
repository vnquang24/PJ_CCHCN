import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { useStoreState } from 'easy-peasy';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import DisasterForm from '../../../components/home/disaster-form';
import styles from './style';

type DetailOfListScreenRouteProp = RouteProp<RootStackParamList, 'DisasterDetail'>;

type Props = {
  route: DetailOfListScreenRouteProp;
};

const DetailOfListScreen: React.FC<Props> = ({ route }) => {
  const { disasterId } = route.params as { disasterId: number };
  const disaster = useStoreState((state: any) =>
    state.disaster.disasters.find((item: any) => item.id === disasterId)
  );
  const [isEditing, setIsEditing] = useState(false);

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
        disasterId={disasterId}
        isEditing={isEditing}
        onToggleEdit={toggleEdit}
      />
    </View>
  );
};

export default DetailOfListScreen;