import { View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${theme.colors.primary.main};
`;
