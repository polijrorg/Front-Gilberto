import {
  ScrollView,
  View,
  Text,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  Image,
  TextInput,
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

export const DivFields = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${theme.colors.secundary.main};
  padding: 24px;
`;

export const ImageUser = styled(Image)`
  max-width: 64px;
  max-height: 64px;
  border-radius: 32px;
`;

export const TextName = styled(Text)`
  font-family: PoppinsBold;
  color: #fbfcfd;
  font-size: 18px;
`;

export const TextFunction = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 16px;
`;

export const DivTexts = styled(View)`
  display: flex;
  margin-left: 16px;
  align-items: flex-start;
  flex-direction: column;
`;

export const Container = styled(View)`
  width: 100%;
  height: auto;
  padding: 0 16px;
  margin: 24px auto;
  gap: 24px;
`;

export const DivInputs = styled(View)`
  display: flex;
  gap: 8px;
`;

export const Label = styled(Text)`
  font-family: Poppins;
  font-size: 14px;
  color: #11181c;
`;

export const InputAction = styled(TextInput)`
  background-color: #f1f3f5;
  border: 1px;
  border-width: 1px;
  border-color: #d7dbdf;
  color: #687076;
  font-size: 16px;
  padding: 4px 10px;
  border-radius: 8px;
`;

export const TextArea = styled(TextInput)`
  background-color: #f1f3f5;
  border: 1px;
  border-width: 1px;
  border-color: #d7dbdf;
  color: #687076;
  font-size: 16px;
  padding: 16px;
  border-radius: 8px;
  vertical-align: top;
`;

export const DivPicker = styled(View)`
  display: flex;
  flex-direction: row;
`;

export const BtnData = styled(TouchableOpacity)`
  border-radius: 8px;
  border-radius: 1px;
  color: #687076;
  background-color: #f1f3f5;
  border: 1px solid #d7dbdf;
  padding: 8px 12px;
  border: 1px solid #ccc2;
`;

export const TextBtnData = styled(Text)`
  font-size: 16px;
  font-family: Poppins;
`;

export const BtnConcluirPlano = styled(TouchableOpacity)`
  width: 80%;
  padding: 10px 8px;
  font-size: 16px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${theme.colors.secundary.main};
`;

export const BtnConcluirSemPlano = styled(TouchableOpacity)`
  width: 80%;
  padding: 10px 8px;
  font-size: 16px;
  margin: 16px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.secundary.main};
  background-color: ${theme.colors.primary.main};
`;

export const TextBtnPlano = styled(Text)`
  font-family: Poppins;
  color: #f8faff;
  text-transform: uppercase;
`;

export const TextBtnSemPlano = styled(Text)`
  font-family: Poppins;
  text-transform: uppercase;
  color: ${theme.colors.secundary.main};
`;
