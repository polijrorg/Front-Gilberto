import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar as RNStatusBar,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  height: 630px;
  align-items: center;
  overflow: hidden;
  background-color: ${theme.colors.primary.main};
`;

export const Main = styled(View)`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

export const DivFileds = styled(View)`
  width: 100%;
  height: auto;
  gap: 4px;
  margin-top: 5%;
`;

export const NameField = styled(Text)`
  color: #11181c;
  font-family: Poppins;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.5px;
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

export const InputField = styled(TextInput)`
  ::placeholder {
    color: #687076;
  }
  width: 100%;
  border-width: 1px;
  border-color: #d7dbdf;
  background-color: #f1f3f5;
  font-size: 12px;
  border-radius: 8px;
  padding: 4px 8px;
`;

interface ButtonProps {
  color: boolean; // Propriedade booleana para determinar a cor do botão
}

export const BtnCreateSeller = styled(TouchableOpacity)<ButtonProps>`
  width: 80%;
  height: 40px;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: ${(props) =>
    props.color ? theme.colors.primary.main : theme.colors.secundary.main};
  background-color: ${theme.colors.secundary.main};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 10%;

  ${(props) =>
    props.disabled && // Condicional para verificar se o botão está desativado
    css`
      opacity: 0.5; /* Define a opacidade como 0.5 quando o botão estiver desativado */
    `}
`;

export const BtnCreateSellerText = styled(Text)`
  color: #ffffff;
  font-size: 14px;
  font-family: PoppinsBold;
  font-weight: bold;
`;

export const ContentModal = styled(View)`
  background-color: white;
  padding: 32px 24px;
  gap: 8px;
  border-radius: 8px;
`;

export const WrapperConteudo = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageWarning = styled(Image)`
  width: 48px;
  height: 48px;
`;

export const TextModal = styled(Text)`
  font-family: Poppins;
  font-size: 14px;
  margin: 16px auto;
  text-align: center;
  letter-spacing: 0.5px;
`;

export const BtnYes = styled(TouchableOpacity)`
  background-color: #3e63dd;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleBtnYes = styled(Text)`
  font-family: PoppinsBold;
  color: #f8faff;
  letter-spacing: 1.25px;
  text-transform: uppercase;
`;

export const BtnBackModal = styled(TouchableOpacity)`
  border: 2px solid ${theme.colors.secundary.main};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleBtnBack = styled(Text)`
  color: ${theme.colors.secundary.main};
  font-family: PoppinsBold;
  font-size: 14px;
  text-transform: uppercase;
`;
