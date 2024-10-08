import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// IMPORT SCREEN
import SettingScreen from '../screens/setting/setting-screen';

const SettingsStack = createNativeStackNavigator<RootStackParamList>();

const SettingsStackNavigator: React.FC = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Setting" component={SettingScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsStackNavigator;