import AppProvider from '@hooks/index';
import Home from '@screens/Home';
import React from 'react';

export default function App() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
}
