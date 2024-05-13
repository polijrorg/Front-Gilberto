import {
  Image,
  Text,
  View,
  StatusBar as RNStatusBar,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const StyledHeading = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  font-family: PoppinsBold;
  color: #fff;
  border-bottom-width: 3px;
  border-bottom-color: #d9e2fc;
  letter-spacing: 0.5px;
  line-height: 64px;
`;

export const StyledWrapper = styled(View)`
  width: 100%;
  height: 65px;
  padding: 0 16px;
  background-color: ${theme.colors.secundary.main};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
`;

export const ButtonLogout = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 0;
  outline: none;
`;

export const IconLogout = styled(Image)`
  width: 24px;
  height: 24px;
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
  background-color: #e5484d;
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

export const BtnBack = styled(TouchableOpacity)`
  border: 2px solid #e5484d;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleBtnBack = styled(Text)`
  color: #e5484d;
  font-family: PoppinsBold;
  font-size: 14px;
  text-transform: uppercase;
`;
