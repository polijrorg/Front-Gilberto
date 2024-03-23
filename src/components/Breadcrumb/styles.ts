import { TouchableOpacity, View, Text } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(View)`
  width: 100%;
  height: auto;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const Button = styled(TouchableOpacity)`
  width: 16px;
  height: 16px;
  padding: 0px;
  border-radius: 8px;
  background-color: #c1c8cd;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ItemContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

export const Crumb = styled(Text)`
  font-size: 10px;
  color: #333;
`;

export const Separator = styled(Text)`
  font-size: 16px;
  margin: 0 5px;
  color: #999;
`;
