import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

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
