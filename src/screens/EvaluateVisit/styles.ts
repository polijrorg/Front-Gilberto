import { TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { Text } from 'react-native';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export const WrapperView = styled(View)`
  width: 100%;
  height: 90%;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  display: flex;
`;

export const ContainerFields = styled(View)`
  max-width: 100%;
  height: auto;
  display: flex;
  justify-content: space-around;
  gap: 24px;
  padding: 10px 16px;
`;

export const DivContainer = styled(View)`
  width: 100%;
  height: auto;
  gap: 4px;
`;

export const TitleInput = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
`;

export const Input = styled(TextInput)`
  font-family: Poppins;
  max-width: 100%;
  padding: 2px 8px;
  border-radius: 4px;
  background-color: #f1f3f5;
  border-width: 1px;
  border-color: #d7dbdf;
  font-size: 12px;
  font-weight: 400;
`;

export const ButtonIniciar = styled(TouchableOpacity)`
  padding: 8px 24px;
  background-color: #3e63dd;
  width: 95%;
  display: flex;
  position: absolute;
  bottom: 0;
  left: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0 auto;
`;

export const TextBtn = styled(Text)`
  font-family: Poppins;
  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
`;
