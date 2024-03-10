import { TouchableOpacity, StatusBar as RNStatusBar } from 'react-native';
import { Text } from 'react-native';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export const WrapperView = styled(View)`
  width: 100%;
  height: 90%;
  padding: 8px;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  display: flex;
  justify-content: space-between;
`;

export const Container = styled(View)`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const Button = styled(TouchableOpacity)`
  width: 16px;
  height: 16px;
  padding: 0px;
  border-radius: 8px;
  background-color: #c1c8cd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Crumb = styled(Text)`
  font-size: 10px;
  color: #333;
`;

export const Separator = styled(Text)`
  font-size: 16px;
  margin: 0 5px;
  color: #999;
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
  width: 100%;
  display: flex;
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
