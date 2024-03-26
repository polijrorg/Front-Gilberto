import {
  TouchableOpacity,
  StatusBar as RNStatusBar,
  ScrollView,
} from 'react-native';
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
  height: 100%;
  display: flex;
`;

export const DivContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;
  margin: 10px auto;
  padding: 16px 8px;
`;

export const TitleInput = styled(Text)`
  font-family: Poppins;
  font-size: 12px;
  font-weight: 400;
  margin: 8px 0;
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
  color: #687076;
`;

export const ButtonFirst = styled(TouchableOpacity)`
  padding: 8px 24px;
  background-color: #3e63dd;
  width: 100%;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  margin-top: 120%;
`;

export const ButtonIniciar = styled(TouchableOpacity)`
  padding: 8px 24px;
  background-color: #3e63dd;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 16px auto;
`;

export const TextBtn = styled(Text)`
  font-family: Poppins;
  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
`;
