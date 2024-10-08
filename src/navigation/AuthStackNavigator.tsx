import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

import LoginScreen from '../screens/auth/loginScreen';
import ForgotPasswordScreen from '../screens/auth/forgotPassScreen';
import VerificationCodeScreen from '../screens/auth/verificationCodeScreen';
import ResetPassScreen from '../screens/auth/resetPassScreen';

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