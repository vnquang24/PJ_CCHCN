import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackNavigator from './HomeStackNavigator';
import FormStackNavigator from './FormStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';
import { RootStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="FormTab" component={FormStackNavigator} />
      <Tab.Screen name="SettingTab" component={SettingStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;