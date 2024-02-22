import {
  View,
  Text,
  Image,
  StatusBar as RNStatusBar,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  overflow: hidden;
  background-color: ${theme.colors.primary.main};
`;

export const Header = styled(View)`
  height: 60px;
  width: 100%;
  display: flex;
  margin: 0 auto;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.secundary.main};
`;

export const TitleHeader = styled(Text)`
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  font-family: PoppinsBold;
  letter-spacing: 0.5px;
  border-bottom-width: 3px;
  border-bottom-color: #d9e2fc;
  line-height: 56px;
`;

export const BtnBack = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 10px;
`;

export const ImageHeader = styled(Image)`
  width: 24px;
  height: 24px;
`;

export const Main = styled(View)`
  width: 80%;
  margin: 10px auto;
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

export const InputField = styled(TextInput)`
  ::placeholder {
    color: #687076;
  }
  border-width: 1px;
  border-color: #d7dbdf;
  background-color: #f1f3f5;
  font-size: 12px;
  border-radius: 8px;
  padding: 4px 8px;
`;

interface CustomDropdownProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomDropdown = styled(View)<CustomDropdownProps>`
  position: relative;
  width: 100%;
`;

export const DropDownButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f1f3f5;
  padding: 8px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #d7dbdf;
`;

export const DropdownList = styled(View)`
  position: absolute;
  width: 100%;
  height: auto;
  background-color: #f1f3f5;
  top: 100%;
  z-index: 1;
  border-width: 1px;
  border-color: #d7dbdf;
  border-radius: 8px;
`;

export const DropdownItem = styled(TouchableOpacity)`
  padding: 10px;
  background-color: #f1f3f5;
  border-radius: 8px;
`;

export const Selected = styled(Text)`
  color: #687076;
  font-size: 12px;
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
