import { View, Image, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { theme } from '@styles/default.theme';

interface CardProps {
  selected: boolean;
}

export const DivWrapper = styled(TouchableOpacity)<CardProps>`
  background-color: ${({ selected }) =>
    selected ? '#edebeb' : theme.colors.primary.main};
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 7px;
  border-radius: 3px;
`;
export const DivImage = styled(View)`
  width: 56px;
  border-radius: 27px;
  height: 56px;
`;

export const ImageVendedor = styled(Image)`
  width: 56px;
  height: 56px;
`;

export const DivText = styled(View)`
  width: 45%;
`;

export const Name = styled(Text)`
  font-size: 16px;
  font-weight: 400;
  color: #11181c;
`;

export const Cargo = styled(Text)`
  color: #687076;
  font-size: 12px;
  font-weight: 400;
`;
export const DivAvalia = styled(View)`
  background-color: #dff3df;
  border-radius: 2px;
  width: 34px;
  height: 32px;
  display: flex;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

export const Nota = styled(Text)`
  color: #46a758;
  font-size: 16px;
  font-weight: 700;
`;
