import { Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styled, { css } from 'styled-components/native';
import { theme } from '@styles/default.theme';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled(View)`
  width: 100%;
  height: 105%;
  border-top-right-radius: 32px;
  border-top-left-radius: 32px;
  background-color: ${theme.colors.primary.main};
`;

export const Forms = styled(View)`
  margin: 30px auto;
  width: 90%;
  height: 40%;
  padding: 30px;
  display: flex;
  background-color: transparent;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Div = styled(View)`
  width: 100%;
  gap: 24px;
`;

export const DivFields = styled(View)`
  gap: 8px;
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
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #f1f3f5;
  font-family: Poppins;
  position: relative;
  ::placeholder {
    color: #687076;
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
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
`;

export const DivGradiente = styled(LinearGradient).attrs({
  colors: ['#3EDDAD', '#3E63DD'],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  height: 8px;
  position: relative;
  bottom: -36px;
`;
