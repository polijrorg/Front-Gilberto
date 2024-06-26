import { View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  background-color: ${theme.colors.primary.main};
  width: 100%;
  height: 300px; // Altura ajustada para o carrossel
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;
