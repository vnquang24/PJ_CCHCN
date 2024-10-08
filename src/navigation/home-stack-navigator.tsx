import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// IMPORT SCREEN
import HomeScreen from '../screens/main/home/home-screen';
import DetailOfListScreen from '../screens/main/home/detail-of-list-screen';

const HomeStack = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator: React.FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="DetailOfList" component={DetailOfListScreen} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;