import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex: 1;
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
  background-color: #fff;
`;

export const Forms = styled(View)`
  margin: 0px auto;
  width: 90%;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
`;

export const DivFields = styled(View)`
  gap: 24px;
  margin: 16px auto;
`;

export const LabelEmail = styled(Text)`
  color: #11181c;
  font-size: 18px;
  font-weight: 400;
  font-family: Poppins;
`;

export const DivViewTextInput = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Input = styled(TextInput)`
  border: none;
  width: 100%;
  border: 1px solid #d7dbdf;
  padding: 14px 8px;
  border-radius: 4px;
  font-size: 14px;
  background-color: #f1f3f5;
  font-family: Poppins;
  position: relative;
  ::placeholder {
    color: #687076;
    font-size: 14px;
  }
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

interface TextInfoProps {
  hasError: boolean;
}

export const TextInfo = styled(Text)<TextInfoProps>`
  color: #687076;
  font-size: 10px;
  font-weight: 400;
  letter-spacing: 0.25px;
  font-family: Poppins;
  ${(props) =>
    props.hasError &&
    css`
      color: red;
    `}
`;

export const ButtonEnviar = styled(TouchableOpacity)`
  padding: 16px 24px;
  width: 100%;
  background-color: ${theme.colors.secundary.main};
  border: 0;
  display: flex;
  margin: 10px 0;
  align-self: center;
  border-radius: 8px;
  gap: 8px;
`;

export const TitleBtn = styled(Text)`
  color: #fff;
  align-self: center;
  font-family: Poppins;
  font-size: 14px; /* Tamanho da fonte maior para melhor visibilidade */
  text-transform: uppercase;
  font-weight: 700;
`;
