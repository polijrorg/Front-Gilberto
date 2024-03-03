import { Image, Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Header = styled(View)`
  width: 100%;
  height: 54px;
  position: relative;
  background-color: ${theme.colors.secundary.main};
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

export const ButtonBack = styled(TouchableOpacity)`
  border: none;
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`;

export const TextWithBorder = styled(View)`
  border-bottom-width: 3px;
  border-bottom-color: #fbfcfd;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 52px;
  width: auto;
`;
export const TextMyTeam = styled(Text)`
  font-weight: 700;
  font-size: 16px;
  color: #fbfcfd;
  letter-spacing: 0.5px;
  font-family: PoppinsBold;
`;

export const BackImage = styled(Image)`
  width: 24px;
  height: 24px;
`;
