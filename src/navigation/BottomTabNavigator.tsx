import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import HomeStackNavigator from './HomeStackNavigator';
import FormStackNavigator from './FormStackNavigator';
import SettingStackNavigator from './SettingStackNavigator';
import { RootStackParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'FormTab') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'SettingTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName ?? 'defaultIconName'} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'Trang chủ' }}
      />
      <Tab.Screen
        name="FormTab"
        component={FormStackNavigator}
        options={{ tabBarLabel: 'Biểu mẫu' }}
      />
      <Tab.Screen
        name="SettingTab"
        component={SettingStackNavigator}
        options={{ tabBarLabel: 'Cài đặt' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;