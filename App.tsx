import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { setNavigator } from './src/services/navigatorService';
import { StoreProvider } from 'easy-peasy';
import store from './src/store/index';

function App() {
  return (
    <StoreProvider store={store}>
      <NavigationContainer ref={setNavigator}>
        <BottomTabNavigator />
    </NavigationContainer>
    </StoreProvider>     
  );
}

export default App;