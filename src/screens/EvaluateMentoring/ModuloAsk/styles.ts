import {
  ScrollView,
  StatusBar as RNStatusBar,
  View,
  Text,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';
import { TouchableOpacity } from 'react-native';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: auto;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  background-color: ${theme.colors.primary.main};
  position: relative;
`;

export const HeaderMentorado = styled(View)`
  width: 100%;
  padding: 16px 8px;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const DivFilds = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
`;

export const ImageUser = styled(Image)`
  max-width: 64px;
  max-height: 64px;
  border-radius: 32px;
`;

export const NomeMentora = styled(Text)`
  font-family: Poppins;
  color: #11181c;
  font-size: 18px;
  padding-left: 16px;
`;

export const AskDiv = styled(View)`
  width: 95%;
  height: auto;
  margin: 10px auto;
  padding: 8px 10px;
  gap: 8px;
  border-width: 1px;
  border-color: #d7dbdf;
  border-radius: 4px;
`;

export const TitleModule = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
`;

export const ButtonConcluir = styled(TouchableOpacity)`
  width: 90%;
  height: auto;
  padding: 8px 16px;
  margin: 24px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.secundary.main};
  border-radius: 8px;
`;

export const TextBtn = styled(Text)`
  font-family: PoppinsBold;
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
`;
