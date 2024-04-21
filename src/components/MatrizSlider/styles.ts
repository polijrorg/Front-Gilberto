import { View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  background-color: ${theme.colors.primary.main};
  width: 85%;
  height: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #d1d1d1; // Cor ajustada
`;
