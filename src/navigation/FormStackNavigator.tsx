import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

// IMPORT SCREEN
import FormScreen from '../screens/formScreen';
import CameraScreen from '../screens/cameraScreen';

const FormStack = createNativeStackNavigator<RootStackParamList>();

const FormStackNavigator: React.FC = () => {
  return (
    <FormStack.Navigator>
        <FormStack.Screen name="Form" component={FormScreen} />
        <FormStack.Screen name="Camera" component={CameraScreen} />
    </FormStack.Navigator>
  );
};

export default FormStackNavigator;

