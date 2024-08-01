import { theme } from '@styles/default.theme';
import { TextInput, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

export const ButtonCreatePlan = styled.TouchableOpacity`
  background-color: #3e63dd;
  padding: 10px;
  border-radius: 5px;
  align-items: center;
  margin-top: 20px;
`;

export const TextBtnCreatePlan = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

export const ContainerPlainVisit = styled.View`
  width: 90%;
  height: auto;

  display: flex;
  justify-content: space-around;

  gap: 8px;
`;

export const Title = styled.Text`
  font-family: Poppins;

  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const InputText = styled(TextInput)`
  padding: 4px 12px;
  font-family: Poppins;
  border-radius: 1px;
  color: #687076;
  background-color: #f1f3f5;
  border: 1px solid #d7dbdf;
`;

export const TextForms = styled(Text)`
  font-family: Poppins;
  font-size: 16px;
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

export const ButtonIniciar = styled(TouchableOpacity)`
  padding: 8px 24px;
  background-color: #3e63dd;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin: 0px auto;
`;

export const TextBtn = styled(Text)`
  font-family: Poppins;
  text-transform: uppercase;
  color: #fff;
  font-size: 16px;
`;

export const ContainerButtons = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin-top: 20px;
`;
