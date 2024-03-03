import {
  ScrollView,
  View,
  Text,
  StatusBar as RNStatusBar,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: auto;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  background-color: ${theme.colors.primary.main};
  position: relative;
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
  height: 500px;
  margin: 10px auto;
`;

export const DivContanerSeller = styled(View)`
  width: 100%;
  height: auto;
  padding: 8px 0;
  margin: 10px auto;
  gap: 8px;
`;

export const ContainerButton = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const BtnModule = styled(TouchableOpacity)`
  background-color: #f1f3f5;
  padding: 4px 8px;
  border-radius: 4px;
`;

export const TextBtn = styled(Text)`
  font-family: Poppins;
  font-weight: 400;
  font-size: 12px;
`;

export const StyledText = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  margin: 20px auto;
  font-size: 16px;
`;

export const BtnAvaliar = styled(TouchableOpacity)`
  background-color: ${theme.colors.secundary.main};
  padding: 8px 24px;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  position: absolute;
  bottom: 64px;
  left: 20px;
`;

export const TextBtnAvaliar = styled(Text)`
  color: #fff;
  font-family: PoppinsBold;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 16px;
`;
