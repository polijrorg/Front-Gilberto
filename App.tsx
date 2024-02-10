import AppProvider from '@hooks/index';
import { NavigationContainer } from '@react-navigation/native';
import Routes from '@routes/index';

import React from 'react';

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes />
      </AppProvider>
    </NavigationContainer>
  );
}
