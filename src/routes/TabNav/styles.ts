import { theme } from '@styles/default.theme';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  background-color: ${theme.colors.primary.main};
  height: 100%;
  margin: 0;
`;
