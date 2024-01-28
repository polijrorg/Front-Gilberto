import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const DivWrapper = styled(View)`
  background-color: ${theme.colors.primary.main};
  width: 100%;
  height: 450px;
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: #d1d1d1; // Cor ajustada
`;

export const TitleSlider = styled(Text)`
  color: #687076;
  font-size: 16px;
  font-weight: 400;
`;
