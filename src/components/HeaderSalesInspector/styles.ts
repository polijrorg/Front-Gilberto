import { theme } from '@styles/default.theme';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = styled(View)`
  width: 100%;
  padding: 2px 16px;
  display: flex;
  background-color: ${theme.colors.secundary.main};
`;

export const ViewInfoUser = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: transparent;
`;

export const ImageUser = styled(Image)`
  width: 64px;
  height: 64px;
  border-radius: 16px;
`;

export const InfoUser = styled(View)`
  display: flex;
  flex-direction: column;
`;

export const Title = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 16px;
`;

export const Loja = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 12px;
`;

export const Funcao = styled(Text)`
  font-family: Poppins;
  color: #fbfcfd;
  font-size: 12px;
`;

export const BtnLixeira = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
`;

export const ImageVectorLixeira = styled(Image)`
  width: 24px;
  height: 24px;
`;

export const Menu = styled(View)`
  width: 100%;
  margin-top: 16px;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface Button {
  isSelected: boolean;
}

export const ButtonItem = styled(TouchableOpacity)<Button>`
  border-bottom-width: ${({ isSelected }) => (isSelected ? '2px' : '0px')};
  border-bottom-color: ${({ isSelected }) =>
    isSelected ? '#fbfcfd' : 'transparent'};
`;
export const TextItem = styled(Text)`
  color: #fbfcfd;
  font-family: Poppins;
  font-size: 14px;
`;
