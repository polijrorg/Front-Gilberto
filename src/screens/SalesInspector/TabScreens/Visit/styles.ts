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
  margin: 16px auto;
  padding: 4px;
  background-color: ${theme.colors.primary.main};
`;

export const VisitTitle = styled.Text`
  font-size: 20px;
  font-family: PoppinsBold;
  font-weight: bold;
`;

export const ViewWrapper = styled(View)`
  margin: 0 0 32px 0;
`;
