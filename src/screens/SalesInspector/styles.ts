import {
  ScrollView,
  View,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const WrapperTela = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.primary.main};
`;

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  position: relative;
  background-color: ${theme.colors.primary.main};
`;

export const DivButtonBack = styled(View)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: ${theme.colors.secundary.main};
  padding: 20px;
`;

export const ButtonBack = styled(TouchableOpacity)`
  border: none;
`;

export const ImageBtn = styled(Image)`
  width: 24px;
  height: 24px;
`;

export const Container = styled(View)`
  width: 100%;
  padding: 4px 16px;
  display: flex;
  background-color: ${theme.colors.secundary.main};
`;

export const ViewInfoUser = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: space-evenly;
  background-color: transparent;
`;

export const ImageUser = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 16px;
`;

export const InfoUser = styled(View)`
  display: flex;
  max-width: 50%;
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 16px;
  overflow: hidden;
`;

export const Loja = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 12px;
  overflow: hidden;
`;

export const Funcao = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 12px;
  overflow: hidden;
`;

export const BtnLixeira = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
`;

export const ImageVectorLixeira = styled(Image)`
  width: 24px;
  height: 24px;
`;
