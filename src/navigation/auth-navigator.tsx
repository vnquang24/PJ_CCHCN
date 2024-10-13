import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import LoginScreen from '../screens/auth/login-screen';
import ForgotPasswordScreen from '../screens/auth/forgot-pass-screen';

const AuthStack = createNativeStackNavigator<RootStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;