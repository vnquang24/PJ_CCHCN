import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useStoreState } from '../../../../store';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './style';

type DetailOfListScreenRouteProp = RouteProp<RootStackParamList, 'DetailOfList'>;

type Props = {
  route: DetailOfListScreenRouteProp;
};

const DetailOfListScreen: React.FC<Props> = ({ route }) => {
  const { disasterId } = route.params;
  const disaster = useStoreState((state) =>
    state.disaster.disasters.find((item) => item.id === disasterId)
  );

  if (!disaster) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy thông tin về thảm họa</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name={disaster.icon} size={50} color="#000" />
      </View>
      <Text style={styles.title}>{disaster.title}</Text>
      <Text style={styles.description}>{disaster.description}</Text>
      {/* Thêm các thông tin chi tiết khác về thảm họa ở đây */}
    </ScrollView>
  );
};

export default DetailOfListScreen;