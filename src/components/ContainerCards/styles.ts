import { View, Text, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const DivWrapper = styled(View)`
  background-color: ${theme.colors.primary.main};
  width: 100%;
  height: auto;
  border-radius: 2px;
  padding: 8px 16px;
  margin: 10px auto;
  display: flex;
`;

export const TitleSlider = styled(Text)`
  color: #11181c;
  font-size: 24px;
  font-weight: 800;
  margin-left: 24px;
  margin-bottom: 16px;
  font-family: PoppinsBold;
`;

export const Cards = styled(View)`
  height: auto;
  gap: 14px;
`;

export const CenteredView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 24px;
`;

export const TitleSellers = styled(Text)`
  text-transform: uppercase;
  font-family: Poppins;
  text-align: center;
  font-size: 13px;
`;

export const DivVisita = styled(View)`
  margin-bottom: 20px;
`;

export const DivMentoria = styled(View)`
  margin-bottom: 20px;
`;

export const TitleSection = styled(Text)`
  font-size: 18px;
  font-weight: normal;
  margin-left: 26px;
  font-family: Poppins;
`;
