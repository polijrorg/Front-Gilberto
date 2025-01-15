import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import styled from 'styled-components/native';

export const DivFields = styled(View)`
  gap: 8px;
`;

export const Input = styled(TextInput)`
  border: none;
  width: 100%;
  border: 1px solid #d7dbdf;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #f1f3f5;
  font-family: Poppins;
  position: relative;

  font-size: 14px;

  ::placeholder {
    color: #687076;
  }
`;

export const DivViewTextInput = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const BtnIconPass = styled(TouchableOpacity)`
  width: 16px;
  height: 16px;
  position: absolute;
  right: 10px;
`;

export const Icon = styled(Image)`
  width: 16px;
  height: 16px;
`;

