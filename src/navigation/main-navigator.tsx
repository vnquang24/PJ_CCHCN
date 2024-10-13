import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '../types/navigation';

// Import các màn hình
import DisasterListScreen from '../screens/home/disaster-list-screen';
import DisasterDetailScreen from '../screens/home/detail-disaster-screen';
import SettingsScreen from '../screens/setting';
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator<RootStackParamList>();
const SettingStack = createNativeStackNavigator<RootStackParamList>();

// Stack Navigator cho phần Home
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="DisasterList" component={DisasterListScreen} />
      <HomeStack.Screen name="DisasterDetail" component={DisasterDetailScreen} />
    </HomeStack.Navigator>
  );
};
// Stack Navigator cho phần Setting
const SettingStackNavigator = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Settings" component={SettingsScreen} />
    </SettingStack.Navigator>
  );
};

// Bottom Tab Navigator chính
const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Icon name={iconName as string} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings-outline" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;