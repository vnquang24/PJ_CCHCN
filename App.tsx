import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StoreProvider } from 'easy-peasy';
import store from './src/store';
import RootNavigator from './src/navigation/root-navigator';
import { setNavigator } from './src/hooks/use-navigation';

const App = () => {
  return (
    <StoreProvider store={store}>
      <NavigationContainer ref={setNavigator}>
        <RootNavigator />
      </NavigationContainer>
    </StoreProvider>
  );
};

export default App;