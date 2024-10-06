import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { getFocusedRouteNameFromRoute, useNavigation, useRoute } from '@react-navigation/native';

// IMPORT SCREEN
import FormScreen from '../screens/formScreen';
import CameraScreen from '../screens/cameraScreen';

const FormStack = createNativeStackNavigator<RootStackParamList>();

const FormStackNavigator: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabHiddenRoutes = ['Camera'];

  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? '';
    if (tabHiddenRoutes.includes(routeName)) {
      navigation.setOptions({ tabBarStyle: { display: 'none' } });
    } else {
      navigation.setOptions({ tabBarStyle: { display: 'flex' } });
    }
  }, [navigation, route]);
  
  return (
    <FormStack.Navigator>
        <FormStack.Screen name="Form" component={FormScreen} />
        <FormStack.Screen name="Camera" component={CameraScreen} />
    </FormStack.Navigator>
  );
};

export default FormStackNavigator;

