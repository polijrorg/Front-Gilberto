import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  max-height: 76% !important;
  overflow: hidden;
  background-color: ${theme.colors.primary.main};
`;

export const WrapperView = styled(ScrollView)`
  display: flex;
  width: 90%;
  height: 100%;
  margin: 8px auto;
  background-color: ${theme.colors.primary.main};
`;
