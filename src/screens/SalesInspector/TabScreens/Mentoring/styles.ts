import { ScrollView, View } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  max-height: 76% !important;
  background-color: ${theme.colors.primary.main};
`;

export const WrapperView = styled(View)`
  display: flex;
  width: 90%;
  height: 100%;
  margin: 8px auto;
`;

export const ViewContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
