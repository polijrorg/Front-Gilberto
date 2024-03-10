import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components/native';

export const DivFields = styled(View)`
  width: 100%;
  height: auto;
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

interface DropdownListProps {
  maxHeight?: number;
}

export const DropdownList = styled(ScrollView)<DropdownListProps>`
  position: absolute;
  width: 100%;
  max-height: ${({ maxHeight }) => (maxHeight ? `${maxHeight}px` : 'auto')};
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
