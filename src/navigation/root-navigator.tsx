import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStoreState } from 'easy-peasy';
import AuthNavigator from './auth-navigator';
import MainNavigator from './main-navigator';
import { LoginModel } from '../store/models/login-state-model';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const isLoggedIn = useStoreState((state: { login: LoginModel }) => state.login.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={MainNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;