import { View, TouchableOpacity, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

export const Wrapper = styled(View)`
  width: 100%;
  background-color: ${theme.colors.primary.main};
`;

export const DivButtonBack = styled(View)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  background-color: ${theme.colors.secundary.main};
  padding: 0px 25px;
  padding-top: 50px;
`;

export const ButtonBack = styled(TouchableOpacity)`
  border: none;
`;

export const ImageBtn = styled(Image)`
  width: 24px;
  height: 24px;
`;

export const Container = styled(View)`
  width: 100%;
  padding: 4px 0px;
  display: flex;
  background-color: ${theme.colors.secundary.main};
`;

export const ViewInfoUser = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  justify-content: space-evenly;
  background-color: transparent;
`;

export const ImageUser = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 16px;
`;

export const InfoUser = styled(View)`
  display: flex;
  max-width: 50%;
  flex-direction: column;
  overflow: hidden;
`;

export const Title = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 16px;
  overflow: hidden;
`;

export const Loja = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 12px;
  overflow: hidden;
`;

export const Funcao = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 12px;
  overflow: hidden;
`;

export const BtnLixeira = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
`;

export const ImageVectorLixeira = styled(Image)`
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
