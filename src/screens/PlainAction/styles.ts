import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';
import { View, ScrollView, Text, StatusBar as RNStatusBar } from 'react-native';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  max-height: 100% !important;
  background-color: ${theme.colors.primary.main};
  margin-top: ${RNStatusBar.currentHeight || 0}px;
`;

export const ViewWrapper = styled(View)`
  display: flex;
  width: 100%;
  height: 90%;
  margin: 0 auto;
`;

export const LoadingContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SectionContainer = styled(View)`
  flex: 1;
  margin-bottom: 20px;
`;

export const EmptyContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled(Text)`
  font-family: 'Poppins';
  font-size: 16px;
  text-align: center;
`;

export const SectionHeader = styled(Text)`
  font-family: 'Poppins';
  font-size: 18px;
  font-weight: bold;
  margin-vertical: 16px;
  padding-horizontal: 16px;
`;

export const Section = styled(View)`
  margin-bottom: 20px;
`;
