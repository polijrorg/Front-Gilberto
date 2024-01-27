import AppProvider from '@hooks/index';
import MentoriaMatriz from '@screens/Mentoria_Matriz';
import React from 'react';

export default function App() {
  return (
    <AppProvider>
      <MentoriaMatriz />
    </AppProvider>
  );
}
