import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 90%;
  flex: 1;
  margin: auto;
`;

export const TemaQuestion = styled(Text)`
  font-family: Poppins;
  font-size: 22px;
  font-style: normal;
  font-weight: bolder;
  margin: 0 8px;
`;

export const ButtonFirst = styled(TouchableOpacity)`
  padding: 8px 12px;
  width: 100%;
  margin: 10px auto;
  background-color: ${theme.colors.secundary.main};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`;

export const TextBtn = styled(Text)`
  font-family: Poppins;
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
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
