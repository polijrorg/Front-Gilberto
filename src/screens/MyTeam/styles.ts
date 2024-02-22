import {
  ScrollView,
  View,
  Text,
  Image,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  TextInput,
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

export const DivContainerInput = styled(View)`
  width: 85%;
  margin: 16px auto;
  display: flex;
  flex-direction: row;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  padding: 2px 8px;
  background-color: #f1f3f5;
  border: 1px solid #d7dbdf;

  ::placeholder {
    color: #687076;
  }
`;

export const InputVendedor = styled(TextInput)`
  width: 90%;
  font-size: 14px;
  color: #687076;
  font-family: Poppins;
  background-color: transparent;
`;

export const ButtonLupa = styled(TouchableOpacity)``;

export const Lupa = styled(Image)`
  width: 18px;
  height: 18px;
`;

export const BtnAddColaborador = styled(TouchableOpacity)`
  width: 90%;
  height: 40px;
  position: fixed;
  bottom: 24px;
  background-color: ${theme.colors.secundary.main};
  border: none;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border-radius: 8px;
`;

export const TextBtn = styled(Text)`
  font-family: PoppinsBold;
  color: #f8faff;
  letter-spacing: 1.25px;
  font-size: 14px;
  text-transform: uppercase;
`;
