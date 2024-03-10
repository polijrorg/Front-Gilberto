import { ScrollView, StatusBar as RNStatusBar, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: auto;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  background-color: ${theme.colors.primary.main};
  position: relative;
`;

export const AskDiv = styled(View)`
  width: 100%;
  height: auto;
  padding: 8px 10px;
  gap: 8px;
`;

export const TitleModule = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
`;
