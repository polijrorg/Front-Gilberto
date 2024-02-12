import { theme } from '@styles/default.theme';
import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { AuthProvider } from './useAuth';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default AppProvider;
