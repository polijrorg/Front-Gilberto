import AppProvider from '@hooks/index';
import Login from '@screens/Login';
import React from 'react';

export default function App() {
  return (
    <AppProvider>
      <Login />
    </AppProvider>
  );
}
