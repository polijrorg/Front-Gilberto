import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar as RNStatusBar,
} from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(ScrollView)`
  width: 100%;
  height: auto;
  margin-top: ${RNStatusBar.currentHeight || 0}px;
  background-color: ${theme.colors.primary.main};
  position: relative;
`;

export const DivFields = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 24px 24px;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.colors.secundary.main};
`;

export const UserInfoContainer = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ImageUser = styled(Image)`
  max-width: 64px;
  max-height: 64px;
  border-radius: 32px;
`;

export const TextName = styled(Text)`
  font-family: PoppinsBold;
  color: #fbfcfd;
  font-size: 18px;
`;

export const TextFunction = styled(Text)`
  font-family: Poppins;
  color: #b7b8bb;
  font-size: 14px;
`;

export const BtnHomeScreen = styled(TouchableOpacity)`
  padding: 12px;
`;

export const DivTexts = styled(View)`
  padding-left: 10px;
`;

export const ModuleContainer = styled(View)`
  margin: 10px 24px;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ModuleName = styled(Text)`
  font-family: PoppinsBold;
  font-size: 16px;
  color: ${theme.colors.primary.dark};
`;

export const ModuleLabel = styled(Text)`
  font-family: Poppins;
  font-size: 14px;
  color: ${theme.colors.primary.dark};
  margin-top: 5px;
`;

export const BtnConcluirPlano = styled(TouchableOpacity)`
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin: 24px 24px;
  background-color: ${theme.colors.secundary.main};
`;

export const TextBtnPlano = styled(Text)`
  font-family: PoppinsBold;
  font-size: 16px;
  color: white;
`;

export const ViewWrapperCrome = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Message = styled(Text)`
  font-family: Poppins;
  color: white;
  font-size: 18px;
`;
