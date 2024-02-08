import AppProvider from '@hooks/index';
import { NavigationContainer } from '@react-navigation/native';
import Routes from '@routes/index';

import React from 'react';

export default function App() {
  const user = { id: '123' };
  return (
    <NavigationContainer>
      <AppProvider>
        <Routes user={user} />
      </AppProvider>
    </NavigationContainer>
  );
}
