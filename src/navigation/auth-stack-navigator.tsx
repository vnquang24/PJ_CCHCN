import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import LoginScreen from '../screens/auth/login-screen';
import ForgotPasswordScreen from '../screens/auth/forgot-pass-screen';
import VerificationCodeScreen from '../screens/auth/verification-code-screen';
import ResetPassScreen from '../screens/auth/reset-pass-screen';

const AuthStack = createNativeStackNavigator<RootStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <AuthStack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPassScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;