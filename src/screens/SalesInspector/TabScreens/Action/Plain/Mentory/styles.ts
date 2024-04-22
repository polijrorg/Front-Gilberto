// styles.ts

import { theme } from '@styles/default.theme';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: 80%;
  display: flex;
`;

export const WrapperView = styled(View)`
  width: 90%;
  max-height: 100%;
  flex: 1;
  padding: 12px;
  gap: 24px;
  margin: 0 auto;
`;

export const TextForms = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
`;

export const InputText = styled(TextInput)`
  padding: 4px 12px;
  font-family: Poppins;
  border-radius: 1px;
  color: #687076;
  background-color: #f1f3f5;
  border: 1px solid #d7dbdf;
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

export const Row = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const BtnCriarAction = styled(TouchableOpacity)`
  width: 90%;
  padding: 12px 8px;
  margin: 0px auto;
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

export const SelectScrollView = styled(ScrollView)`
  flex: 1;
  height: auto; /* Permitir que o ScrollView se ajuste dinamicamente ao conteúdo */
  max-height: 200px; /* Definir uma altura máxima para evitar que ocupe muito espaço na tela */
`;
