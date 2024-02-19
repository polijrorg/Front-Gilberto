import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.primary.main};
`;

export const WrapperView = styled(View)`
  display: flex;
  width: 90%;
  height: 100%;
  margin: 0 auto;
`;
