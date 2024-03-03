import { ScrollView, View, Text, StatusBar as RNStatusBar } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  background-color: ${theme.colors.primary.main};
`;

export const NameField = styled(Text)`
  color: #11181c;
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.5px;
`;

export const Container = styled(View)`
  width: 90%;
  height: 1200px;
  margin: 10px auto;
`;
