import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import LoginScreen from './src/screens/auth/loginScreen';
import { setNavigator } from './src/services/navigatorService';
import { StoreProvider, useStoreState } from 'easy-peasy';
import store from './src/store/index';
import { LoginModel } from './src/store/models/loginModel';
import { useDoubleBackPress } from './src/hooks/doubleBackpress';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const isLoggedIn = useStoreState((state: { login: LoginModel }) => state.login.isLoggedIn);
  useDoubleBackPress();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer ref={setNavigator}>
        <AppContent />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;