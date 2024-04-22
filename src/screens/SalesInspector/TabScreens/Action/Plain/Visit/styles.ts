import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  max-height: 65% !important;
  background-color: ${theme.colors.primary.main};
`;

export const WrapperView = styled(View)`
  display: flex;
  width: 90%;
  max-height: 90%;
  margin: 0 auto;
`;

export const BtnCriarAction = styled(TouchableOpacity)`
  width: 90%;
  padding: 12px 8px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: ${theme.colors.secundary.main};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TextBtn = styled(Text)`
  font-size: 16px;
  text-transform: uppercase;
  font-family: Poppins;
  color: #fff;
`;
