import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const ViewWrapper = styled(View)`
  width: 100%;
  height: 75%;
  margin: 0 auto;

  padding: 16px 20px;
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
  font-family: Poppins;
  font-size: 16px;
  text-align: center;
`;

export const SectionHeader = styled(Text)`
  font-family: Poppins;
  font-size: 18px;
  font-weight: bold;
  vertical-align: 16px;
`;

export const BtnCriarAction = styled(TouchableOpacity)`
  width: 90%;
  padding: 12px 8px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: ${theme.colors.secundary.main};
  justify-content: center;
  align-items: center;
`;

export const TextBtn = styled(Text)`
  font-size: 16px;
  text-transform: uppercase;
  font-family: Poppins;
  color: #fff;
`;

export const ListWrapper = styled(View)`
  width: 100%;
  margin-bottom: 20px;
`;
