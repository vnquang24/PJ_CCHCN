import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './src/navigation/bottom-tab-navigator';
import AuthStackNavigator from './src/navigation/auth-stack-navigator';
import { setNavigator } from './src/services/navigator-service';
import { StoreProvider, useStoreState } from 'easy-peasy';
import store from './src/store/index';
import { LoginModel } from './src/store/models/login-model';
import { useDoubleBackPress } from './src/hooks/double-backpress';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const isLoggedIn = useStoreState((state: { login: LoginModel }) => state.login.isLoggedIn);
  useDoubleBackPress();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
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