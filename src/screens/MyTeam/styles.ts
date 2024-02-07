import { ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';
import { View } from 'moti';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: ${theme.colors.primary.main};
`;
export const WrapperTela = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.primary.main};
`;
